function one() {
    setTimeout(() => {
      console.log(111);
      iterator.next() //执行第二个暂停点
    },1000)
  }
  function two() {
    setTimeout(() => {
      console.log(222);
      iterator.next() //执行第三个暂停点
    },2000)
  }
  function three() {
    setTimeout(() => {
      console.log(333);
    },3000)
  }
  
  function * gen() {
      yield one()
      yield two()
      yield three()
  }
  let iterator = gen()
  iterator.next() //执行第一个暂停点
  
