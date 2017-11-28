function userVoted(user, id, voters) {
    if (voters.indexOf(user) > -1) {
        return false;
    } else if (voters.indexOf(id) > -1) {
        return false;
    }
    return true;
}

export default userVoted;