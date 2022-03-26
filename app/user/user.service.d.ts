import { Result } from "../config/resultType";
import { JwtService } from '@nestjs/jwt';
import UserLoginDto from './dto/user-login.dto';
import UserRegisterDto from './dto/user-register.dto';
import User from './pojo/User';
import GenerateService from 'src/generate/generate.service';
export declare class UserService {
    private readonly jwtService;
    private readonly generateService;
    private readonly COLLECTION_NAME;
    private dbService;
    private result;
    constructor(jwtService: JwtService, generateService: GenerateService);
    register(userRegisterDto: UserRegisterDto): Promise<Result>;
    login(userLoginDto: UserLoginDto): Promise<Result>;
    getUserInfo(token: string): Promise<User>;
}
