export interface IslandInfo {
  islandName: string
  field: string,
  color: string,
  img: string,
  presentation: string,
  guideline: string,
  hasGame: boolean,
  reward: string,
  results: {
    summary: string,
    didYouKnow: string,
    caracteristics: { iconLeft: string, iconRight: string, labelLeft: string, labelRight: string, value: number } [],
    specificJob: {
      jobName: string,
      generalInfos: string,
      salary: number,
      studies: string,
      moreInfo: string,
      moreJobs: string,
      videos: { title: string, url: string } []
    },
  }
}
