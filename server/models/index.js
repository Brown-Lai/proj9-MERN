// 當有人 require(models) 這個資料夾時， 就能隨時使用 user, course 這兩個 model

module.exports = {
  user: require("./user-model"),
  course: require("./course-model"),
};
