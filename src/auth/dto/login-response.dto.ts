import { Exclude, Expose, Type } from "class-transformer";
import { ReadClientDto } from "src/clients/dto/read-client.dto";

@Exclude()
export class LoginResponseDto {
  @Expose()
  @Type(() => ReadClientDto)
  public readonly user: ReadClientDto;

  @Expose()
  public readonly accessToken: string;
}
