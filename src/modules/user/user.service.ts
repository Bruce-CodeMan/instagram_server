import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm"
import { Repository, DeepPartial } from "typeorm";

// Custom Imports
import { User } from "./models/user.entity";
import { makeSalt, encryptPassword } from "@/shared/utils/encrypt";

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private UserRepository: Repository<User>
  ){}

  /**
   * 新增一个用户
   * @param entity 用户的实体 
   * @returns true / false
   */
  async create(entity: DeepPartial<User>): Promise<boolean> {
    entity.salt = makeSalt();
    entity.password = encryptPassword(entity.password, entity.salt);
    const res = await this.UserRepository.insert(entity);
    if(res && res.raw.affectedRows >0) {
      return true;
    }
    return false;
  }

  /**
   * 删除一个用户
   * @param id 用户的id
   * @returns true / false
   */
  async del(id: string): Promise<boolean> {
    const res = await this.UserRepository.delete(id);
    if(res.affected > 0) {
      return true;
    }
    return false;
  }

  /**
   * 更新一个用户
   * @param id 用户的Id
   * @param entity 用户的实体
   * @returns 
   */
  async update(id: string, entity: DeepPartial<User>): Promise<boolean> {
    const res = await this.UserRepository.update(id, entity);
    if(res.affected > 0) {
      return true;
    }
    return false;
  }

  /**
   * 通过手机号查询用户
   * @param tel 用户的手机号
   * @returns 用户的实体
   */
  async findByTel(tel: string): Promise<User> {
    const res = await this.UserRepository.findOne({
      where: {
        tel
      }
    })
    return res;
  }

  /**
   * 通过Id查询用户
   * @param id 用户的id
   * @returns 用户的实体
   */
  async findById(id: string): Promise<User> {
    const res = await this.UserRepository.findOne({
      where: {
        id
      }
    })
    return res;
  }
}