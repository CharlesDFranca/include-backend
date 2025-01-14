export abstract class AbstractEntity<T> {
    constructor(
      protected readonly props: T,
      private id?: string,
    ) {}
  
    public get getID(): string | undefined {
      return this.id;
    }
  
    public set setID(id: string) {
      this.id = id;
    }
  
    public toJSON(): T & { id: string | undefined } {
      return {
        ...this.props,
        id: this.getID,
      };
    }
  }
  