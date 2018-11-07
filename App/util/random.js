export const randomNumber = () => {
    let str = 'abcdefghjklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890';
    let str_='';
    for (let i = 0; i < 6; i++) {
      let num = parseInt(Math.random()*(62+1),10);
      str_ += str.substring(num,num+1)
    }
   return str_;
}    