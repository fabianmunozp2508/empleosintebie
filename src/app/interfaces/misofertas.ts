import { Job } from "./job.interfaces";
import { JobOffer } from "./offer.interfaces";
import { Profile } from "./profile";

export interface MisOfertas {
  profiles: Profile[];
  jobOffers: JobOffer[];
  jobs: Job[];
}
