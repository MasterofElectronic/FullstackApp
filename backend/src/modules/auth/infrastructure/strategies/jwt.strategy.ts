import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy, ExtractJwt, StrategyOptions } from "passport-jwt";
import { ConfigService } from "@nestjs/config";


/**
 * JwtStrategy extiende PassportStrategy con la estrategia JWT
 * para validar tokens en peticiones autenticadas.
 */
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private readonly configService: ConfigService){
        const secret = configService.get<string>('JWT_SECRET');
        if (!secret) {
            throw new Error('JWT_SECRET must be defined in environment');
        }

        const options: StrategyOptions = {
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: secret,
        }
        super(options);
    }
    

    
    /**
    * Validate se ejecuta tras verificar la firma del JWT.
    * @param payload - Contenido del token (sub, email, role)
    * @returns La información del usuario que estará disponible en req.user
    */
    async validate(payload: any) {
        const { sub: id, email, role } = payload;
        if (!id) {
            throw new UnauthorizedException('Invalid token payload');
        }
        return { id, email, role };
    }
}