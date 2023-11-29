import {Controller, Post} from "@nestjs/common";
import {UserEntity} from "../../user/entity/user.entity";
import {ApiTags} from "@nestjs/swagger";

@ApiTags("Student")
@Controller("/student")
export class StudentController {

}