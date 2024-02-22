interface Crowdfunding {
  id: string
  title: string
  logo: string
  description: string
  owner: string
  token: string
  balance: bigint
  claimed: bigint
  target: bigint
  donators: number
  deadline: number
}

interface DTOCrowdfunding {
  id: string
  title: string
  logo: string
  description: string
  owner: string
  token: string
  balance: string
  claimed: string
  target: string
  donators: string
  deadline: string
}

interface TokenInfo {
  name: string
  assetId: string
  precision: number
}
