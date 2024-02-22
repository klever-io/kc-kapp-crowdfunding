export const abi = JSON.stringify({
  types: {
    CrowdfundingData: {
      type: 'struct',
      fields: [
        {
          name: 'id',
          type: 'bytes',
        },
        {
          name: 'title',
          type: 'bytes',
        },
        {
          name: 'logo',
          type: 'bytes',
        },
        {
          name: 'description',
          type: 'bytes',
        },
        {
          name: 'owner',
          type: 'Address',
        },
        {
          name: 'token',
          type: 'TokenIdentifier',
        },
        {
          name: 'balance',
          type: 'BigUint',
        },
        {
          name: 'claimed',
          type: 'BigUint',
        },
        {
          name: 'target',
          type: 'BigUint',
        },
        {
          name: 'donators',
          type: 'u64',
        },
        {
          name: 'deadline',
          type: 'u64',
        },
      ],
    },
  },
})
