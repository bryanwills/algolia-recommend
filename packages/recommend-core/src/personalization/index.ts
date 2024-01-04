import { getAffinities } from './getAffinities';
import { getStrategy } from './getStrategy';

type GetPersonalizationFilters = {
  userToken: string;
  region: string;
  apiKey: string;
  appId: string;
  cache?: {
    profileMinutes?: number;
    strategyMinutes?: number;
  };
};

export const getPersonalizationFilters = async ({
  userToken,
  region,
  apiKey,
  appId,
  cache,
}: GetPersonalizationFilters) => {
  if (!userToken || !region || !apiKey || !appId) {
    return [];
  }

  try {
    const [affinities, strategy] = await Promise.all([
      getAffinities({
        userToken,
        apiKey,
        appId,
        region,
        cache: cache?.profileMinutes,
      }),
      getStrategy({ apiKey, appId, region, cache: cache?.strategyMinutes }),
    ]);

    // compute optional filters
    const optionalFilters = Object.entries(affinities.scores).flatMap(
      ([facet, values]) =>
        Object.entries(values).map(([value, score]) => {
          const weight =
            strategy.facetsScoring.find((value) => value.facetName === facet)
              ?.score || 100;
          const weightedScore = Math.floor(score * (weight / 100));
          return `${facet}:${value}<score=${weightedScore}>`;
        })
    );

    return optionalFilters;
  } catch (error) {
    return [];
  }
};