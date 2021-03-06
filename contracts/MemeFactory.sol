pragma solidity ^0.4.24;
import "./Admin.sol";

contract MemeFactory is Admin {
  Meme[] public memes;
  

  struct Upvote {
    uint createdAt; 
    address user;
  }

  struct Sellable {
    uint percentage;
    address user;
  }

  struct Meme {
    uint index;
    bytes32 photoImage;
    bytes32 title;
    uint price;
    uint basePrice;
    address[] owners;
    mapping (address => bool) hasVoted;
    mapping (address => uint) ownersByShares;
    mapping (uint => Upvote) upvotes;
    mapping (uint => Sellable) sellables;
    uint upvotesIndex;
    uint sellablesIndex;
  }

  function createMeme(bytes32 title, bytes32 photoImage) public payable {
    require(msg.value > 0, "Price should be greater than zero");

    Meme memory meme = Meme({
      index: memes.length,
      photoImage: photoImage,
      title: title,
      price: msg.value,
      basePrice: msg.value,
      owners: new address[](0),
      upvotesIndex: 1,
      sellablesIndex: 0
    });
    
    uint index = memes.push(meme) - 1;
    Meme storage _meme = memes[index];
    
    _meme.owners.push(msg.sender);
    _meme.upvotes[0] = Upvote({ user: msg.sender, createdAt: now });
    _meme.hasVoted[msg.sender] = true;
    _meme.ownersByShares[msg.sender] = 100;
  }

  function buyMemeShares(uint memeIndex, uint sharePercentage) public payable {
    Meme storage meme = memes[memeIndex];
    require(meme.price * sharePercentage == msg.value);
    require(sharePercentage <= 100);
    
    uint sharePercentageBought = sharePercentage;
    
    for (uint i = 0; i < meme.sellablesIndex; i++) {
        Sellable storage sellable = meme.sellables[i];
        
        if (sellable.user == msg.sender || sellable.percentage == 0){
            return;
        }
        
        if (sellable.percentage >= sharePercentageBought) {
          sellable.percentage -= sharePercentageBought;
          meme.ownersByShares[sellable.user] -= sharePercentageBought;
          meme.ownersByShares[msg.sender] += sharePercentageBought;
          break;
        } else {
          sharePercentageBought -= sellable.percentage;
          meme.ownersByShares[sellable.user] -= sellable.percentage;
          meme.ownersByShares[msg.sender] += sellable.percentage;
          sellable.percentage = 0;
        }
    }

    meme.owners.push(msg.sender);
  }
  
  function sellMemeShare(uint memeIndex, uint sharePercentage) public {
    Meme storage meme = memes[memeIndex];
    require(meme.ownersByShares[msg.sender] > 0);
    require(meme.ownersByShares[msg.sender] >= sharePercentage);
    Sellable memory sellable = Sellable({ user: msg.sender, percentage: sharePercentage });
    meme.sellables[meme.sellablesIndex] = sellable;
    meme.sellablesIndex++;
  }
  
  function upvoteMeme(uint memeIndex) public {
    Meme storage meme = memes[memeIndex];
    require(!meme.hasVoted[msg.sender]);
    meme.upvotes[meme.upvotesIndex] = Upvote({ createdAt: now, user: msg.sender });
    meme.upvotesIndex++;
    meme.hasVoted[msg.sender] = true;
  }
  
  function updateMemePrice(uint memeIndex, uint price) public onlyAdmin onlyOwner {
    Meme storage meme = memes[memeIndex];
    meme.price = price;
  }
  
  function batchUpdateMemePrices(uint[] memory memeIndexes, uint[] memory prices) public onlyAdmin onlyOwner {
    require(memeIndexes.length == prices.length);
    for (uint i = 0; i < memeIndexes.length; i++) {
        Meme storage meme = memes[i];
        meme.price = prices[i];
    }
  }
  
  function getMemesLength() public view returns (uint) {
      return memes.length;
  }

  function getMemeDetails(uint memeIndex) public view returns (
    uint[] memory upvotes,
    uint[] memory sellables,
    address[] memory owners
  ) {
    Meme storage meme = memes[memeIndex];
    uint[] memory _upvotes = new uint[](meme.upvotesIndex);
    uint[] memory _sellabes = new uint[](meme.sellablesIndex);

    for (uint i = 0; i < meme.upvotesIndex; i++) {
      _upvotes[i] = meme.upvotes[i].createdAt;
    }

    for (uint x = 0; x < meme.sellablesIndex; x++ ) {
      _sellabes[x] = meme.sellables[x].percentage;
    }

    return (_upvotes, _sellabes, meme.owners);
   }

    function hasUserVoted(uint memeIndex) public view returns (
      bool
    ) {
      Meme storage m = memes[memeIndex];
      return m.hasVoted[msg.sender];
    }
  
}