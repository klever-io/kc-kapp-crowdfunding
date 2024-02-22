export const convertCrowdfundingJSON = (c: Crowdfunding): DTOCrowdfunding => {
  return {
    id: c.id,
    title: c.title,
    logo: c.logo,
    description: c.description,
    owner: c.owner,
    token: c.token,
    balance: c.balance?.toString() || '0',
    claimed: c.claimed?.toString() || '0',
    target: c.target?.toString() || '0',
    donators: c.donators?.toString() || '0',
    deadline: c.deadline?.toString() || '0',
  } as DTOCrowdfunding
}

export const convertCrowdfundingsJSON = (
  crowdfundings: Crowdfunding[],
): DTOCrowdfunding[] => {
  return crowdfundings.map(c => convertCrowdfundingJSON(c))
}

export const convertDTOCrowdfunding = (c: DTOCrowdfunding): Crowdfunding => {
  return {
    id: c.id,
    title: c.title,
    logo: c.logo,
    description: c.description,
    owner: c.owner,
    token: c.token,
    balance: BigInt(c.balance),
    claimed: BigInt(c.claimed),
    target: BigInt(c.target),
    donators: Number(c.donators),
    deadline: Number(c.deadline),
  } as Crowdfunding
}
