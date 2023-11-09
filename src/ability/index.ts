import { Global, Module } from "@nestjs/common";
import { AbilitiesService } from "./services";

@Global()
@Module({
    providers: [AbilitiesService],
    exports: [AbilitiesService]
})

export class AbilityModule {}