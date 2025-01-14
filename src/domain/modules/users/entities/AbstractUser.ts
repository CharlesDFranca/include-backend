import { AbstractEntity } from "../../../common/entities/AbstractEntity";
import { Email } from "../value-objects/Email";

type UserProps = {
  name: string;
  email: Email;
  password: string;
};

export abstract class AbstractUser extends AbstractEntity<UserProps> {
  constructor(props: UserProps, id: string) {
    super(props, id);
  }

  public get getName(): string {
    return this.props.name;
  }

  public set setName(name: string) {
    this.props.name = name;
  }

  public get getEmail(): string {
    return this.props.email.toString();
  }

  public get getPassword(): string {
    return this.props.password;
  }

  public validPassword(password: string): boolean {
    return this.props.password === password;
  }
}
