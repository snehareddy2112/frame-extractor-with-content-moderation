import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService, private jwt: JwtService) {}

  async register(email: string, password: string) {
    return this.prisma.user.create({
      data: { email, password },
    });
  }

  async login(email: string, password: string): Promise<{ access_token: string }> {
    const user = await this.prisma.user.findUnique({ where: { email } });

    if (!user || user.password !== password) {
      throw new Error('Invalid credentials');
    }

    const payload = { sub: user.id, email: user.email };
    const token = await this.jwt.signAsync(payload);

    return { access_token: token };
  }
}
