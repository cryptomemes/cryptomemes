module.exports = [
	{
		"constant": true,
		"inputs": [],
		"name": "getMemesLength",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"name": "memes",
		"outputs": [
			{
				"name": "photoImage",
				"type": "bytes32"
			},
			{
				"name": "title",
				"type": "bytes32"
			},
			{
				"name": "price",
				"type": "uint256"
			},
			{
				"name": "upvotesIndex",
				"type": "uint256"
			},
			{
				"name": "sellablesIndex",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "memeIndex",
				"type": "uint256"
			}
		],
		"name": "getMeme",
		"outputs": [
			{
				"name": "photoImage",
				"type": "bytes32"
			},
			{
				"name": "title",
				"type": "bytes32"
			},
			{
				"name": "price",
				"type": "uint256"
			},
			{
				"name": "upvotes",
				"type": "uint256[]"
			},
			{
				"name": "sellables",
				"type": "uint256[]"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "memeIndex",
				"type": "uint256"
			},
			{
				"name": "sharePercentage",
				"type": "uint256"
			}
		],
		"name": "sellMemeShare",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "memeIndex",
				"type": "uint256"
			},
			{
				"name": "sharePercentage",
				"type": "uint256"
			}
		],
		"name": "buyMemeShares",
		"outputs": [],
		"payable": true,
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "title",
				"type": "bytes32"
			},
			{
				"name": "photoImage",
				"type": "bytes32"
			}
		],
		"name": "createMeme",
		"outputs": [],
		"payable": true,
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "memeIndex",
				"type": "uint256"
			},
			{
				"name": "price",
				"type": "uint256"
			}
		],
		"name": "updateMemePrice",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "memeIndex",
				"type": "uint256"
			}
		],
		"name": "upvoteMeme",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	}
]