const RewardHistory = require("../../models/RewardHistory");
const User = require("../../models/User");

module.exports.reward = async (userId) => {
  const lastReward = await RewardHistory.findOne({ user: userId }).sort({
    _id: -1,
  });

  if (lastReward && Date.now() + 10 * 1000 < lastReward._id.getTimestamp()) {
    throw new Error({
      error: true,
      message: "Geçersiz ödül isteği",
    });
  }
  
  const reward = new RewardHistory({
    user: userId,
    rewardCoin: 10
  });
  const user = await User.findOne({ _id: userId });
  user.remainingMessageLimit += 10;
  user.save();
  reward.save();
  
  return {
    success: true
  };
};
