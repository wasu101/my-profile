import { NextResponse } from 'next/server';

export const revalidate = 3600; // cache 1 hour

interface GitHubUser {
  public_repos: number;
  followers: number;
  following: number;
}

interface GitHubRepo {
  stargazers_count: number;
  forks_count: number;
  language: string | null;
  fork: boolean;
}

interface ContributionDay {
  date: string;
  contributionCount: number;
  color: string;
}

async function fetchAllRepos(baseUrl: string, headers: HeadersInit): Promise<GitHubRepo[]> {
  const all: GitHubRepo[] = [];
  let page = 1;
  while (true) {
    const res = await fetch(`${baseUrl}&page=${page}&per_page=100`, {
      headers,
      next: { revalidate: 3600 },
    });
    if (!res.ok) break;
    const batch: GitHubRepo[] = await res.json();
    if (batch.length === 0) break;
    all.push(...batch);
    if (batch.length < 100) break;
    page++;
  }
  return all;
}

async function fetchContributions(username: string, token: string): Promise<{
  totalContributions: number;
  totalCommits: number;
  totalPRs: number;
  totalIssues: number;
  totalRepos: number;
  totalReviews: number;
  weeks: { contributionDays: ContributionDay[] }[];
} | null> {
  const now = new Date();
  const from = new Date(now);
  from.setFullYear(from.getFullYear() - 1);
  const fromISO = from.toISOString();
  const toISO = now.toISOString();

  const query = `
    query($username: String!, $from: DateTime!, $to: DateTime!) {
      user(login: $username) {
        contributionsCollection(from: $from, to: $to) {
          totalCommitContributions
          totalPullRequestContributions
          totalIssueContributions
          totalRepositoryContributions
          totalPullRequestReviewContributions
          restrictedContributionsCount
          contributionCalendar {
            totalContributions
            weeks {
              contributionDays {
                date
                contributionCount
                color
              }
            }
          }
        }
      }
    }
  `;

  const res = await fetch('https://api.github.com/graphql', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ query, variables: { username, from: fromISO, to: toISO } }),
    next: { revalidate: 3600 },
  });

  if (!res.ok) return null;

  const json = await res.json();
  const collection = json?.data?.user?.contributionsCollection;
  if (!collection) return null;

  return {
    totalContributions: collection.contributionCalendar.totalContributions + (collection.restrictedContributionsCount ?? 0),
    totalCommits: collection.totalCommitContributions,
    totalPRs: collection.totalPullRequestContributions,
    totalIssues: collection.totalIssueContributions,
    totalRepos: collection.totalRepositoryContributions,
    totalReviews: collection.totalPullRequestReviewContributions,
    weeks: collection.contributionCalendar.weeks,
  };
}

export async function GET() {
  const username = 'wasu101';
  const token = process.env.GITHUB_TOKEN ?? '';
  const hasToken = !!token;

  const restHeaders: HeadersInit = {
    Accept: 'application/vnd.github+json',
    'X-GitHub-Api-Version': '2022-11-28',
    ...(hasToken ? { Authorization: `Bearer ${token}` } : {}),
  };

  try {
    const userUrl = hasToken
      ? `https://api.github.com/user`
      : `https://api.github.com/users/${username}`;

    const reposBaseUrl = hasToken
      ? `https://api.github.com/user/repos?sort=updated&visibility=all&affiliation=owner`
      : `https://api.github.com/users/${username}/repos?sort=updated`;

    const [userRes, repos, contributions] = await Promise.all([
      fetch(userUrl, { headers: restHeaders, next: { revalidate: 3600 } }),
      fetchAllRepos(reposBaseUrl, restHeaders),
      hasToken ? fetchContributions(username, token) : Promise.resolve(null),
    ]);

    if (!userRes.ok) throw new Error('GitHub API error');

    const user: GitHubUser = await userRes.json();
    const ownRepos = repos.filter((r) => !r.fork);
    const totalStars = repos.reduce((sum, r) => sum + r.stargazers_count, 0);
    const totalForks = repos.reduce((sum, r) => sum + r.forks_count, 0);

    const langCount: Record<string, number> = {};
    for (const repo of ownRepos) {
      if (repo.language) {
        langCount[repo.language] = (langCount[repo.language] ?? 0) + 1;
      }
    }

    const topLanguages = Object.entries(langCount)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 8)
      .map(([name, count]) => ({ name, count }));

    return NextResponse.json({
      repos: hasToken ? repos.length : user.public_repos,
      followers: user.followers,
      following: user.following,
      stars: totalStars,
      forks: totalForks,
      topLanguages,
      contributions,
    });
  } catch {
    return NextResponse.json({ error: 'Failed to fetch GitHub stats' }, { status: 503 });
  }
}

