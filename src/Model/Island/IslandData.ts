import type { IslandName } from './Island'

interface IslandData {
  id: number
  islandName: IslandName
  field: string
  maincolor: string
  lightcolor: string
  darkcolor: string
  presentation: string
  guideline: string
  results: {
    summary: string
    didYouKnow: string
    teamWork: number
    shifts: number
    specificJob: {
      jobName: string
      generalInfos: string
      salary: number
      studies: string
    }
  }
}

export default IslandData
