import { Greeting } from "../const/greeting"

export const getGreeting = (): string => {
  const date = new Date()
  const hour = date.getHours()
  switch (true) {
    case hour >= 5 && hour <= 10:
      return Greeting.MORNING
    case hour >= 11 && hour <= 16:
      return Greeting.HELLO
    case hour >= 17 && hour <= 20:
      return Greeting.EVENING
    case hour >= 21 || hour <= 4:
      return Greeting.NIGHT
  }
}
