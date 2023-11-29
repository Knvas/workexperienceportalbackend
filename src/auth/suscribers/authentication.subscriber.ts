import { EntitySubscriberInterface, EventSubscriber, InsertEvent, UpdateEvent } from "typeorm";
import { AuthenticationEntity } from "../entity/authentication.entity";
import { AuthenticationProvider } from "../providers/authentication.provider";


@EventSubscriber()
export class AuthenticationSubscriber implements EntitySubscriberInterface<AuthenticationEntity> {

  listenTo() {
    return AuthenticationEntity;
  }

  async beforeInsert({ entity }: InsertEvent<AuthenticationEntity>): Promise<void> {
    const password = entity.password;
    const email = entity.email;

    // hash password
    if (password) {
      entity.password = await AuthenticationProvider.generateHash(password);
    }

    if (email) {
      entity.email = email.toLowerCase();
    }

  }

  async beforeUpdate({ entity, databaseEntity }: UpdateEvent<AuthenticationEntity>): Promise<void> {
    const password = entity.password;

    if (password) {
      const updatedPassword = await AuthenticationProvider.generateHash(password);

      if (password !== databaseEntity?.password) {
        entity.password = updatedPassword;
      }
    }
  }
}