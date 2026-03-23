export interface User {
  id: number
  name: string
  email: string
  createdAt: string
}

export type AssetType = 'STOCK' | 'ETF' | 'BOND' | 'CRYPTO'

export interface Asset {
  id: number
  ticker: string
  name: string
  type: AssetType
  latestPrice?: AssetPrice
}

export interface AssetPrice {
  id: number
  asset: Asset
  date: string
  closePrice: number
}

export interface Holding {
  id: number
  asset: Asset
  quantity: number
  avgBuyPrice: number
}

export type MovementType = 'BUY' | 'SELL' | 'DIVIDEND'

export interface Movement {
  id: number
  asset: Asset
  type: MovementType
  date: string
  quantity: number | null
  price: number
  total: number
}

export interface PaginatedResponse<T> {
  data: T[]
  total: number
  page: number
  limit: number
  totalPages: number
}

export interface PortfolioHoldingSummary {
  ticker: string
  name: string
  type: AssetType
  quantity: number
  currentPrice: number
  totalValue: number
  avgBuyPrice: number
  unrealizedGain: number
  unrealizedGainPct: number
}

export interface PortfolioSummary {
  totalBalance: number
  monthlyProfitability: number
  totalAssets: number
  holdings: PortfolioHoldingSummary[]
}

export interface ChartPoint {
  date: string
  value: number
}

export interface PortfolioChart {
  chartData: ChartPoint[]
}

export interface MovementsQuery {
  type?: MovementType
  from?: string
  to?: string
  page?: number
  limit?: number
}

export interface CreateMovementPayload {
  userId: number
  assetId: number
  type: MovementType
  date: string
  quantity?: number | null
  price: number
  total: number
}
