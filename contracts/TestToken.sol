// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

contract TestToken is ERC20, Ownable, ReentrancyGuard {
    uint256 public constant FAUCET_AMOUNT = 100 * 10**18; // 100 tokens
    uint256 public constant COOLDOWN_TIME = 24 hours;
    
    mapping(address => uint256) public lastClaim;
    mapping(address => uint256) public totalClaimed;
    
    event TokensClaimed(address indexed user, uint256 amount, uint256 timestamp);
    event FaucetRefilled(uint256 amount);
    
    constructor() ERC20("TestNet Token", "TTK") {
        _mint(address(this), 1000000 * 10**18); // 1M tokens for faucet
    }
    
    function claimTokens() external nonReentrant {
        require(
            block.timestamp >= lastClaim[msg.sender] + COOLDOWN_TIME,
            "Cooldown period not met"
        );
        require(
            balanceOf(address(this)) >= FAUCET_AMOUNT,
            "Insufficient faucet balance"
        );
        
        lastClaim[msg.sender] = block.timestamp;
        totalClaimed[msg.sender] += FAUCET_AMOUNT;
        
        _transfer(address(this), msg.sender, FAUCET_AMOUNT);
        
        emit TokensClaimed(msg.sender, FAUCET_AMOUNT, block.timestamp);
    }
    
    function getTimeUntilNextClaim(address user) external view returns (uint256) {
        if (lastClaim[user] == 0) return 0;
        uint256 nextClaimTime = lastClaim[user] + COOLDOWN_TIME;
        if (block.timestamp >= nextClaimTime) return 0;
        return nextClaimTime - block.timestamp;
    }
    
    function getFaucetBalance() external view returns (uint256) {
        return balanceOf(address(this));
    }
    
    function refillFaucet(uint256 amount) external onlyOwner {
        _mint(address(this), amount);
        emit FaucetRefilled(amount);
    }
    
    function emergencyWithdraw() external onlyOwner {
        uint256 balance = balanceOf(address(this));
        _transfer(address(this), owner(), balance);
    }
}
