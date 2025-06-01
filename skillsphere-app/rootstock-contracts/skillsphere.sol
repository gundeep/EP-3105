// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract SkillSharing {
    // Store session details
    struct Session {
        address teacher;
        address learner;
        string skill;
        bool isCompleted;
        uint256 completionTimestamp;
    }

    // Array to store sessions of teacher-learner 
    Session[] public sessions;

    // Events to log session activities
    event SessionCreated(uint sessionId, address teacher, address learner, string skill);
    event SessionCompleted(uint sessionId, address teacher, address learner, uint256 timestamp);

    // Function to create a new session
    function createSession(address learner, string memory skill) public {
        sessions.push(Session({
            teacher: msg.sender,
            learner: learner,
            skill: skill,
            isCompleted: false,
            completionTimestamp: 0
        }));
        emit SessionCreated(sessions.length - 1, msg.sender, learner, skill);
    }

    // Function to mark a session as completed
    function completeSession(uint256 sessionId) public {
        require(sessionId < sessions.length, "Session does not exist");
        Session storage session = sessions[sessionId];
        require(msg.sender == session.learner, "Only learner can complete the session");
        require(!session.isCompleted, "Session already completed");

        session.isCompleted = true;
        session.completionTimestamp = block.timestamp;
        
        emit SessionCompleted(sessionId, session.teacher, session.learner, block.timestamp);
    }

    // Function to get session details
    function getSession(uint256 sessionId) public view returns (
        address teacher,
        address learner,
        string memory skill,
        bool isCompleted,
        uint256 completionTimestamp
    ) {
        require(sessionId < sessions.length, "Session does not exist");
        Session storage session = sessions[sessionId];
        return (
            session.teacher,
            session.learner,
            session.skill,
            session.isCompleted,
            session.completionTimestamp
        );
    }
}