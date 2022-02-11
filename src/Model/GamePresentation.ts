export interface GamePresentation {
  islandName: string
  field: string,
  color: string,
  img: string,
  presentation: string,
  guideline: string,
  results: {
    summary: string,
    didYouKnow: string,
    teamWork: number,
    shifts: number,
    specificJob: {
      jobName: string,
      generalInfos: string,
      salary: number,
      studies: string,
    },
  }
}
