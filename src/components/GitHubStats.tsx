'use client';
import { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform, useInView } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import {
  StarIcon,
  CodeBracketIcon,
  UserGroupIcon,
  ArrowPathRoundedSquareIcon,
  ArrowUpTrayIcon,
  ExclamationCircleIcon,
  ChartBarIcon,
  ChatBubbleLeftRightIcon,
} from '@heroicons/react/24/outline';

function AnimatedNumber({ value }: { value: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });
  const motionVal = useMotionValue(0);
  const spring = useSpring(motionVal, { stiffness: 60, damping: 18, mass: 0.8 });
  const display = useTransform(spring, (v) => Math.round(v).toLocaleString());

  useEffect(() => {
    if (inView) motionVal.set(value);
  }, [inView, value, motionVal]);

  return <motion.span ref={ref}>{display}</motion.span>;
}

const LANG_COLORS: Record<string, string> = {
  TypeScript: '#3178c6', JavaScript: '#f1e05a', Python: '#3572A5',
  'Jupyter Notebook': '#DA5B0B', CSS: '#563d7c', HTML: '#e34c26',
  Shell: '#89e051', Dockerfile: '#384d54', Go: '#00ADD8',
  Rust: '#dea584', Java: '#b07219', 'C#': '#178600', PHP: '#4F5D95',
  Ruby: '#701516', Swift: '#F05138', Kotlin: '#A97BFF', Dart: '#00B4AB',
  Vue: '#41b883', SCSS: '#c6538c', MDX: '#fcb32c',
};

const cardPalette = ['bg-white', 'bg-brut-yellow', 'bg-white', 'bg-brut-pink'];

interface ContributionDay { date: string; contributionCount: number; color: string; }
interface Contributions {
  totalContributions: number; totalCommits: number; totalPRs: number;
  totalIssues: number; totalRepos: number; totalReviews: number;
  weeks: { contributionDays: ContributionDay[] }[];
}
interface GitHubStatsData {
  repos: number; followers: number; following: number; stars: number; forks: number;
  topLanguages: { name: string; count: number }[];
  contributions: Contributions | null;
}

function HeatCell({ day, maxCount }: { day: ContributionDay; maxCount: number }) {
  const level =
    day.contributionCount === 0 ? 0
    : day.contributionCount <= Math.ceil(maxCount * 0.25) ? 1
    : day.contributionCount <= Math.ceil(maxCount * 0.5) ? 2
    : day.contributionCount <= Math.ceil(maxCount * 0.75) ? 3
    : 4;
  // 0 = empty (cream), 1-4 = increasing yellow→pink intensity
  const colors = [
    'bg-brut-cream',
    'bg-brut-yellow opacity-40',
    'bg-brut-yellow opacity-70',
    'bg-brut-yellow',
    'bg-brut-pink',
  ];
  return (
    <div
      title={`${day.date}: ${day.contributionCount} contributions`}
      className={`w-3 h-3 ${colors[level]} border border-brut-ink`}
    />
  );
}

const MONTH_LABELS = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

export default function GitHubStats() {
  const { t } = useLanguage();
  const [data, setData] = useState<GitHubStatsData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/github-stats')
      .then((r) => r.json())
      .then((d) => { setData(d); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  const statCards = data ? [
    { label: t('Repositories', 'REPOSITORIES'), value: data.repos, icon: CodeBracketIcon },
    { label: t('Stars ทั้งหมด', 'TOTAL STARS'), value: data.stars, icon: StarIcon },
    { label: t('Forks', 'FORKS'), value: data.forks, icon: ArrowPathRoundedSquareIcon },
    { label: t('Followers', 'FOLLOWERS'), value: data.followers, icon: UserGroupIcon },
  ] : [];

  const contribCards = data?.contributions ? [
    { label: t('Contributions ปีนี้', 'CONTRIBUTIONS'), value: data.contributions.totalContributions, icon: ChartBarIcon },
    { label: 'COMMITS', value: data.contributions.totalCommits, icon: ArrowUpTrayIcon },
    { label: 'PULL REQUESTS', value: data.contributions.totalPRs, icon: ArrowPathRoundedSquareIcon },
    { label: 'REVIEWS', value: data.contributions.totalReviews, icon: ChatBubbleLeftRightIcon },
    { label: 'ISSUES', value: data.contributions.totalIssues, icon: ExclamationCircleIcon },
    { label: t('Repos สร้างใหม่', 'NEW REPOS'), value: data.contributions.totalRepos, icon: CodeBracketIcon },
  ] : [];

  const maxLangCount = data ? Math.max(...data.topLanguages.map((l) => l.count), 1) : 1;
  const allDays = data?.contributions?.weeks.flatMap((w) => w.contributionDays) ?? [];
  const maxDayCount = Math.max(...allDays.map((d) => d.contributionCount), 1);

  const monthPositions: { label: string; col: number }[] = [];
  if (data?.contributions) {
    let lastMonth = -1;
    data.contributions.weeks.forEach((week, col) => {
      const firstDay = week.contributionDays[0];
      if (firstDay) {
        const month = new Date(firstDay.date).getMonth();
        if (month !== lastMonth) {
          monthPositions.push({ label: MONTH_LABELS[month], col });
          lastMonth = month;
        }
      }
    });
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="mb-12"
    >
      <div className="text-center mb-8">
        <span className="code-tag mb-3 inline-flex">git remote -v · @wasu101</span>
        <h4 className="brut-heading text-2xl sm:text-3xl mt-2">
          {t('กิจกรรมบน GitHub', 'GITHUB ACTIVITY')}
        </h4>
      </div>

      {loading ? (
        <div className="space-y-4">
          <div className="flex flex-wrap gap-3 justify-center">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="w-36 h-28 bg-white brut-border brut-shadow-sm animate-pulse" />
            ))}
          </div>
          <div className="h-36 bg-white brut-border brut-shadow-sm animate-pulse max-w-4xl mx-auto" />
        </div>
      ) : !data ? (
        <p className="text-center text-sm font-medium">
          {t('ไม่สามารถโหลดข้อมูลได้', 'Unable to load stats')}
        </p>
      ) : (
        <>
          {/* Repo stats */}
          <div className="flex flex-wrap gap-3 sm:gap-4 justify-center mb-5">
            {statCards.map(({ label, value, icon: Icon }, i) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06, duration: 0.35 }}
                whileHover={{ y: -4, rotate: i % 2 === 0 ? -2 : 2 }}
                className={`flex flex-col items-start gap-1 brut-border brut-shadow-sm w-32 sm:w-40 py-3 px-3 font-mono-brut ${cardPalette[i % cardPalette.length]}`}
              >
                <div className="flex items-center gap-2 w-full">
                  <span className="w-6 h-6 bg-brut-ink text-brut-yellow brut-border-2 flex items-center justify-center flex-shrink-0">
                    <Icon className="w-3.5 h-3.5" />
                  </span>
                  <span className="text-[10px] text-zinc-500 lowercase truncate">{label.toLowerCase()}:</span>
                </div>
                <span className="text-2xl sm:text-3xl font-black tabular-nums leading-none">
                  <AnimatedNumber value={value} />
                </span>
                <span className="text-[10px] text-zinc-600 lowercase">{'// '}<span className="text-brut-pink">git</span> {label.toLowerCase().split(' ')[0]}</span>
              </motion.div>
            ))}
          </div>

          {/* Contribution stats */}
          {contribCards.length > 0 && (
            <div className="flex flex-wrap gap-3 sm:gap-4 justify-center mb-8">
              {contribCards.map(({ label, value, icon: Icon }, i) => (
                <motion.div
                  key={label}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.25 + i * 0.06, duration: 0.35 }}
                  whileHover={{ y: -4, rotate: i % 2 === 0 ? 2 : -2 }}
                  className={`flex flex-col items-start gap-1 brut-border brut-shadow-sm w-32 sm:w-40 py-3 px-3 font-mono-brut ${cardPalette[(i + 1) % cardPalette.length]}`}
                >
                  <div className="flex items-center gap-2 w-full">
                    <span className="w-6 h-6 bg-brut-ink text-brut-yellow brut-border-2 flex items-center justify-center flex-shrink-0">
                      <Icon className="w-3.5 h-3.5" />
                    </span>
                    <span className="text-[10px] text-zinc-500 lowercase truncate">{label.toLowerCase()}:</span>
                  </div>
                  <span className="text-2xl sm:text-3xl font-black tabular-nums leading-none">
                    <AnimatedNumber value={value} />
                  </span>
                  <span className="text-[10px] text-zinc-600 lowercase">{'// '}<span className="text-brut-pink">+</span> {label.toLowerCase().split(' ')[0]}</span>
                </motion.div>
              ))}
            </div>
          )}

          {/* Heatmap */}
          {data.contributions && (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              className="max-w-5xl mx-auto bg-white brut-border brut-shadow-md mb-6 overflow-hidden"
            >
              {/* Terminal title bar */}
              <div className="flex items-center gap-2 px-3 py-1.5 bg-brut-ink text-brut-cream font-mono-brut text-[10px] sm:text-[11px] border-b-2 border-brut-ink">
                <span className="w-2.5 h-2.5 rounded-full bg-brut-pink" />
                <span className="w-2.5 h-2.5 rounded-full bg-brut-yellow" />
                <span className="w-2.5 h-2.5 rounded-full bg-green-400" />
                <span className="ml-2 truncate">git log --graph --since=&quot;1 year ago&quot;</span>
                <span className="ml-auto text-brut-yellow hidden sm:inline">{allDays.length} days</span>
              </div>

              <div className="p-4 sm:p-6 overflow-x-auto">
                <div className="min-w-max font-mono-brut">
                  <div className="flex gap-1 mb-1 ml-6">
                    {data.contributions.weeks.map((_, col) => {
                      const mp = monthPositions.find((m) => m.col === col);
                      return (
                        <div key={col} className="w-3 flex-shrink-0 text-[9px] font-bold leading-none text-zinc-600">
                          {mp ? mp.label : ''}
                        </div>
                      );
                    })}
                  </div>

                  <div className="flex gap-1">
                    <div className="flex flex-col gap-1 mr-1">
                      {['', 'Mon', '', 'Wed', '', 'Fri', ''].map((d, i) => (
                        <div key={i} className="h-3 text-[9px] font-bold leading-none flex items-center text-zinc-600">{d}</div>
                      ))}
                    </div>
                    {data.contributions.weeks.map((week, wi) => (
                      <div key={wi} className="flex flex-col gap-1">
                        {week.contributionDays.map((day) => (
                          <HeatCell key={day.date} day={day} maxCount={maxDayCount} />
                        ))}
                      </div>
                    ))}
                  </div>

                  <div className="flex items-center gap-1.5 mt-3 justify-end font-mono-brut">
                    <span className="text-[10px] text-zinc-600">{'// '}{t('น้อย', 'less')}</span>
                    {[
                      'bg-brut-cream',
                      'bg-brut-yellow opacity-40',
                      'bg-brut-yellow opacity-70',
                      'bg-brut-yellow',
                      'bg-brut-pink',
                    ].map((c, i) => (
                      <div key={i} className={`w-3 h-3 border border-brut-ink ${c}`} />
                    ))}
                    <span className="text-[10px] text-zinc-600">{t('มาก', 'more')}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Top Languages */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="max-w-2xl mx-auto bg-brut-ink text-brut-cream brut-border brut-shadow-md overflow-hidden font-mono-brut"
          >
            {/* Title bar */}
            <div className="flex items-center gap-2 px-3 py-1.5 border-b-2 border-brut-cream/20 text-[10px] sm:text-[11px]">
              <span className="w-2.5 h-2.5 rounded-full bg-brut-pink" />
              <span className="w-2.5 h-2.5 rounded-full bg-brut-yellow" />
              <span className="w-2.5 h-2.5 rounded-full bg-green-400" />
              <span className="ml-2 text-brut-cream/70 truncate">cloc --top-languages</span>
            </div>

            <div className="p-4 sm:p-5">
              <div className="flex flex-col gap-2.5">
                {data.topLanguages.map(({ name, count }, i) => {
                  const pct = Math.round((count / maxLangCount) * 100);
                  const color = LANG_COLORS[name] ?? '#6b7280';
                  return (
                    <div key={name} className="flex items-center gap-2 sm:gap-3 text-[11px] sm:text-xs">
                      <span className="text-brut-pink w-4 flex-shrink-0">{String(i + 1).padStart(2, '0')}</span>
                      <span className="w-2.5 h-2.5 border border-brut-cream/40 flex-shrink-0" style={{ background: color }} />
                      <span className="font-bold w-20 sm:w-28 truncate text-brut-yellow">{name}</span>
                      <div className="flex-1 h-2.5 bg-brut-cream/10 border border-brut-cream/30 overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${pct}%` }}
                          viewport={{ once: true }}
                          transition={{ delay: 0.2 + i * 0.04, duration: 0.6 }}
                          className="h-full"
                          style={{ background: color }}
                        />
                      </div>
                      <span className="font-bold w-10 text-right text-brut-cream/80 tabular-nums">{pct}%</span>
                    </div>
                  );
                })}
              </div>

              <div className="mt-5 pt-4 border-t border-dashed border-brut-cream/20 flex flex-wrap items-center justify-between gap-3">
                <span className="text-[10px] text-brut-cream/50">
                  {'// '}<span className="text-brut-pink">$</span> total: {data.topLanguages.length} languages
                </span>
                <a
                  href="https://github.com/wasu101"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-brut-yellow text-brut-ink font-mono-brut font-black text-[11px] sm:text-xs px-3 py-1.5 brut-border-2 brut-shadow-sm brut-hover lowercase"
                >
                  <span className="text-brut-pink">$</span>
                  <CodeBracketIcon className="w-3.5 h-3.5" />
                  open --github
                </a>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </motion.div>
  );
}
