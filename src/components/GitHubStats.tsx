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

// Animated counter — counts up like an odometer when in view
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

// Language → GitHub color mapping
const LANG_COLORS: Record<string, string> = {
  TypeScript: '#3178c6',
  JavaScript: '#f1e05a',
  Python: '#3572A5',
  'Jupyter Notebook': '#DA5B0B',
  CSS: '#563d7c',
  HTML: '#e34c26',
  Shell: '#89e051',
  Dockerfile: '#384d54',
  Go: '#00ADD8',
  Rust: '#dea584',
  Java: '#b07219',
  'C#': '#178600',
  PHP: '#4F5D95',
  Ruby: '#701516',
  Swift: '#F05138',
  Kotlin: '#A97BFF',
  Dart: '#00B4AB',
  Vue: '#41b883',
  SCSS: '#c6538c',
  MDX: '#fcb32c',
};

interface ContributionDay {
  date: string;
  contributionCount: number;
  color: string;
}

interface Contributions {
  totalContributions: number;
  totalCommits: number;
  totalPRs: number;
  totalIssues: number;
  totalRepos: number;
  totalReviews: number;
  weeks: { contributionDays: ContributionDay[] }[];
}

interface GitHubStatsData {
  repos: number;
  followers: number;
  following: number;
  stars: number;
  forks: number;
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

  const colors = ['bg-white/5', 'bg-cyan-900/60', 'bg-cyan-700/70', 'bg-cyan-500/80', 'bg-cyan-400'];

  return (
    <div
      title={`${day.date}: ${day.contributionCount} contributions`}
      className={`w-3 h-3 rounded-[2px] ${colors[level]}`}
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
    { label: t('Repositories', 'Repositories'), value: data.repos, icon: CodeBracketIcon },
    { label: t('Stars ทั้งหมด', 'Total Stars'), value: data.stars, icon: StarIcon },
    { label: t('Forks', 'Forks'), value: data.forks, icon: ArrowPathRoundedSquareIcon },
    { label: t('Followers', 'Followers'), value: data.followers, icon: UserGroupIcon },
  ] : [];

  const contribCards = data?.contributions ? [
    { label: t('Contributions ปีนี้', 'Contributions (yr)'), value: data.contributions.totalContributions, icon: ChartBarIcon },
    { label: 'Commits', value: data.contributions.totalCommits, icon: ArrowUpTrayIcon },
    { label: 'Pull Requests', value: data.contributions.totalPRs, icon: ArrowPathRoundedSquareIcon },
    { label: 'Code Reviews', value: data.contributions.totalReviews, icon: ChatBubbleLeftRightIcon },
    { label: 'Issues', value: data.contributions.totalIssues, icon: ExclamationCircleIcon },
    { label: t('Repos สร้างใหม่', 'Repos Created'), value: data.contributions.totalRepos, icon: CodeBracketIcon },
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
      transition={{ duration: 0.6, delay: 0.1 }}
      className="mb-16"
    >
      <div className="text-center mb-8">
        <p className="text-cyan-400 text-sm font-medium uppercase tracking-widest mb-1">
          {t('สถิติ GitHub', 'GitHub Stats')}
        </p>
        <h4 className="text-2xl font-bold text-white">
          {t('กิจกรรมบน GitHub ของผม', 'My GitHub Activity')}
        </h4>
      </div>

      {loading ? (
        <div className="space-y-4">
          <div className="flex flex-wrap gap-4 justify-center">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="w-44 h-24 rounded-2xl bg-white/5 animate-pulse" />
            ))}
          </div>
          <div className="h-36 rounded-2xl bg-white/5 animate-pulse max-w-4xl mx-auto" />
        </div>
      ) : !data ? (
        <p className="text-zinc-500 text-center text-sm">
          {t('ไม่สามารถโหลดข้อมูลได้', 'Unable to load stats')}
        </p>
      ) : (
        <>
          {/* Repo stats */}
          <div className="flex flex-wrap gap-3 justify-center mb-4">
            {statCards.map(({ label, value, icon: Icon }, i) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07, duration: 0.4 }}
                className="flex flex-col items-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-cyan-500/30 rounded-2xl w-36 py-5 transition-all duration-300"
              >
                <div className="w-8 h-8 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center">
                  <Icon className="w-4 h-4 text-cyan-400" />
                </div>
                <span className="text-2xl font-bold text-white tabular-nums">
                  <AnimatedNumber value={value} />
                </span>
                <span className="text-zinc-500 text-xs text-center leading-tight">{label}</span>
              </motion.div>
            ))}
          </div>

          {/* Contribution stats */}
          {contribCards.length > 0 && (
            <div className="flex flex-wrap gap-3 justify-center mb-8">
              {contribCards.map(({ label, value, icon: Icon }, i) => (
                <motion.div
                  key={label}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.28 + i * 0.07, duration: 0.4 }}
                  className="flex flex-col items-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-teal-500/30 rounded-2xl w-36 py-5 transition-all duration-300"
                >
                  <div className="w-8 h-8 rounded-xl bg-teal-500/10 border border-teal-500/20 flex items-center justify-center">
                    <Icon className="w-4 h-4 text-teal-400" />
                  </div>
                  <span className="text-2xl font-bold text-white tabular-nums">
                    <AnimatedNumber value={value} />
                  </span>
                  <span className="text-zinc-500 text-xs text-center leading-tight">{label}</span>
                </motion.div>
              ))}
            </div>
          )}

          {/* Contribution heatmap */}
          {data.contributions && (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="max-w-5xl mx-auto bg-white/5 border border-white/10 rounded-2xl p-6 mb-6 overflow-x-auto"
            >
              <p className="text-zinc-400 text-xs uppercase tracking-widest mb-4 text-center">
                {t('Contribution Calendar (ปีล่าสุด)', 'Contribution Calendar (Last Year)')}
              </p>

              <div className="min-w-max">
                {/* Month labels */}
                <div className="flex gap-1 mb-1 ml-6">
                  {data.contributions.weeks.map((_, col) => {
                    const mp = monthPositions.find((m) => m.col === col);
                    return (
                      <div key={col} className="w-3 flex-shrink-0 text-[9px] text-zinc-600 leading-none">
                        {mp ? mp.label : ''}
                      </div>
                    );
                  })}
                </div>

                <div className="flex gap-1">
                  {/* Day-of-week labels */}
                  <div className="flex flex-col gap-1 mr-1">
                    {['', 'Mon', '', 'Wed', '', 'Fri', ''].map((d, i) => (
                      <div key={i} className="h-3 text-[9px] text-zinc-600 leading-none flex items-center">
                        {d}
                      </div>
                    ))}
                  </div>

                  {/* Week columns */}
                  {data.contributions.weeks.map((week, wi) => (
                    <div key={wi} className="flex flex-col gap-1">
                      {week.contributionDays.map((day) => (
                        <HeatCell key={day.date} day={day} maxCount={maxDayCount} />
                      ))}
                    </div>
                  ))}
                </div>

                {/* Legend */}
                <div className="flex items-center gap-1.5 mt-3 justify-end">
                  <span className="text-zinc-600 text-[10px]">{t('น้อย', 'Less')}</span>
                  {['bg-white/5','bg-cyan-900/60','bg-cyan-700/70','bg-cyan-500/80','bg-cyan-400'].map((c, i) => (
                    <div key={i} className={`w-3 h-3 rounded-[2px] ${c}`} />
                  ))}
                  <span className="text-zinc-600 text-[10px]">{t('มาก', 'More')}</span>
                </div>
              </div>
            </motion.div>
          )}

          {/* Top Languages */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="max-w-2xl mx-auto bg-white/5 border border-white/10 rounded-2xl p-6"
          >
            <p className="text-zinc-400 text-xs uppercase tracking-widest mb-5 text-center">
              {t('ภาษาที่ใช้บ่อย', 'Top Languages')}
            </p>
            <div className="flex flex-col gap-3">
              {data.topLanguages.map(({ name, count }, i) => {
                const pct = Math.round((count / maxLangCount) * 100);
                const color = LANG_COLORS[name] ?? '#6b7280';
                return (
                  <div key={name} className="flex items-center gap-3">
                    <span className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ background: color }} />
                    <span className="text-zinc-300 text-sm w-32 truncate">{name}</span>
                    <div className="flex-1 h-2 bg-white/5 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${pct}%` }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.45 + i * 0.05, duration: 0.6 }}
                        className="h-full rounded-full"
                        style={{ background: color }}
                      />
                    </div>
                    <span className="text-zinc-500 text-xs w-8 text-right">{count}</span>
                  </div>
                );
              })}
            </div>

            <div className="text-center mt-6">
              <a
                href="https://github.com/wasu101"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 text-sm transition-colors"
              >
                <CodeBracketIcon className="w-4 h-4" />
                {t('ดูโปรไฟล์ GitHub', 'View GitHub Profile')}
              </a>
            </div>
          </motion.div>
        </>
      )}
    </motion.div>
  );
}

