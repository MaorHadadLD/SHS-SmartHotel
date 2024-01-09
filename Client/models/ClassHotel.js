// ClassHotel.js
class ClassHotel {
    constructor(
      hotelName,
      hotelId,
      city,
      breakfastInfo,
      dinnerInfo,
      lobbyBarInfo,
      spaInfo,
      wifiInfo,
      gymInfo,
      entertainmentInfo,
      poolInfo,
      PoolBarInfo,
      SynagogueInfo,
      KeyOnSaturday,
      checkOutInfo
    ) {
      this.hotelName = hotelName;
      this.hotelId = hotelId;
      this.city = city;
      // Boolean properties for Hotel Information screen
      this.breakfastInfo = breakfastInfo;
      this.dinnerInfo = dinnerInfo;
      this.lobbyBarInfo = lobbyBarInfo;
      this.spaInfo = spaInfo;
      this.wifiInfo = wifiInfo;
      this.gymInfo = gymInfo;
      this.entertainmentInfo = entertainmentInfo;
      this.poolInfo = poolInfo;
      this.PoolBarInfo = PoolBarInfo;
      this.SynagogueInfo = SynagogueInfo;
      this.KeyOnSaturday = KeyOnSaturday;
      this.checkOutInfo = checkOutInfo;
      // Up to here
    }
  }
  
  export default ClassHotel;
  