// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract SkillSharing {
    // Store session details
    struct Session {
        address teacher;
        address learner;
        string skill;
    }

    // Array to store sessions of teacher-learner 
    Session[] public sessions;

    // Event to log session creation
    event SessionCreated(uint sessionId, address teacher, address learner, string skill);

    // Function to create a new session
    function createSession(address learner, string memory skill) public {
        sessions.push(Session(msg.sender, learner, skill));
        emit SessionCreated(sessions.length - 1, msg.sender, learner, skill);
    }
}