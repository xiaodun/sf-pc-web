(function () {
  return function (argData, argParams) {
    //argData 数据的副本
    argData = argData || [];
    const file = argParams.files[0];
    argData.unshift(file);
    file.id = +new Date() + '';
    return {
      isWrite: true, //是否覆盖数据
      data: argData, //需要存储的新数据
      response: {
        //返回的数据
        code: 200,
        data: {
          success: true,
          list: argData,
        },
      },
    };
  };
})();
