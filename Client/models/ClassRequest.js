class ClassRequest {
    constructor(id, departmentId, requestNotice) {
      this.id = id;
      this.categories = departmentId;
      this.requestNotice = requestNotice;
    }
  }

  export default ClassRequest;