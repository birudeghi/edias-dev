import { InMemoryCache } from "@apollo/client";
import { isConnectedVar } from "./localStorage";

export const cache = new InMemoryCache({
    typePolicies: {
      Connection: {
        fields: {
          id() {
  //to safely merge two different objects
          },
          isConnected: {
            read() {
              return isConnectedVar();
            },
            merge: false
          }
        }
      }
    }
  })
