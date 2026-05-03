export type SlideType = 'Hero' | 'Main' | 'Graph' | 'Testimonial' | 'Summary' | string

export interface Metric {
  label: string
  value: string
  context: string
  source: string
}

export interface Quote {
  text: string
  attribution: string
}

export interface NamedValue {
  label: string
  value: number
}

export interface DomainValue {
  domain: string
  value: number
}

export interface HeatmapRole {
  role: string
  demand: number
  competition: number
  salaryLeverage: number
}

export interface RoadmapPhase {
  phase: string
  focus: string
  skills: string[]
}

export interface ComparisonColumn {
  title: string
  items: string[]
}

export interface Series {
  name: string
  values: number[]
}

export interface ChartData {
  chartType: 'heroMetric' | 'radialSkillMap' | 'heatmap' | 'roadmap' | 'beforeAfter' | 'bar' | 'column' | 'matrix' | 'comparison' | 'highlightMetric' | 'scorecard' | string
  data?: NamedValue[] | DomainValue[] | HeatmapRole[] | Array<{ dimension: string; score: number }>
  leftColumn?: ComparisonColumn
  rightColumn?: ComparisonColumn
  xAxis?: string[]
  yAxisLabel?: string
  series?: Series[]
  rows?: string[]
  columns?: string[]
  values?: number[][]
  categories?: string[]
  before?: { label: string; values: number[] }
  after?: { label: string; values: number[] }
  note?: string
  phases?: RoadmapPhase[]
}

export interface SlideNode {
  slideNumber: number
  slideType: SlideType
  layout: string
  title: string
  subtitle: string
  coreMessage: string
  metrics: Metric[]
  chartData: ChartData
  quote: Quote
  sources: string[]
}

export interface SlideDeck {
  deckTitle: string
  version: string
  topic: string
  narrativeArc: string
  slides: SlideNode[]
}
