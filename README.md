# Hackable-Contract
CarMarket is a marketplace where people interested in cars can buy directly from the company. 

The car company has its own tokens(CCY) used in purchasing cars from the company. The first 100 users to patronize the company are given 1 Car token(CCY) for free.
These tokens can then be used to purchase cars from the company.

Each user can only mint a token once from the CarToken's contract. Implying that a user can only purchase one car.
There is a bug however. A smart user can bypass this restriction to purchase more than one car.

Figure out how to purchase more than one car from the car company for free.

CarToken: deployed to; https://rinkeby.etherscan.io/token/0x3b84bf5d380418412cedfa960608eb72ff6a8f2e

CarMarket: deployed to; https://rinkeby.etherscan.io/address/0xdd8183b98f0fdfcfe82413ce98831e6d16f8150d

CarFactory: deployed to; https://rinkeby.etherscan.io/address/0x6948d87177d580fd958386531450f254bb3179bd

# How to use

Deploy the CarToken contract.

Deploy the CarMarket contract with the address of the CarToken contract.

Deploy the CarFactory contract with the address of the CarMarket and CarToken contract.

In the CarMarket contract, set the address of the CarFactory by calling the setCarFactory() function.

In the CarToken contract, mint out 100, 000 CCY tokens to both the CarMarket and CarFactory contract, by calling the privilegeMint function.

Everything is set at this point. The attackers can come in rolling.
 
