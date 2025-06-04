import { goto } from "$app/navigation";
import { AuthState } from "$src/auth/auth.state";
import { Config } from "$src/config";
import { RecordService } from "$src/services/record.service";
import { routeLink } from "$utils/route";

export const load = async () => {
  // guard route
  if (!AuthState.currentState) {
    goto(routeLink(Config.Auth.loginRoute));
  }
  const records = await RecordService.GetRecords();

  return {
    records,
  };
};
