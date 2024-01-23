// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

contract BlockCloud{

    struct Access{
        address user;
        bool access;
    }

    mapping(address => string[]) value;
    mapping (address => mapping(address=>bool)) ownership;
    mapping (address => Access[]) accessList;
    mapping(address => mapping(address=>bool)) previousData;
    
    function addFile(address _user, string memory url) external {
        value[_user].push(url);
    }
    function shareAccess(address _user) external {
        ownership[msg.sender][_user] = true;
        if(previousData[msg.sender][_user]){
            for(uint i=0; i<accessList[msg.sender].length; i++){
                if(accessList[msg.sender][i].user == _user){
                    accessList[msg.sender][i].access = true;  
                }
            }
        }
        else {
            accessList[msg.sender].push(Access(_user,true));
            previousData[msg.sender][_user] = true;
        }
    }
    function revokeAccess(address _user) public {
        ownership[msg.sender][_user] = false;
        for(uint i=0; i<accessList[msg.sender].length; i++){
            if(accessList[msg.sender][i].user == _user){
                accessList[msg.sender][i].access = false;  
            }
        }
    }
    function fetchData(address _user) external view returns (string[] memory) {
        require(_user==msg.sender || ownership[_user][msg.sender], "You don't have access");
        return value[_user];
    }
    function sharedWith() public view returns (Access[] memory) {
      return accessList[msg.sender];
    }
}