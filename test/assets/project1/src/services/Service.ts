export interface Service {
  dispatch(m: Message): Result;
}
interface Message {
}
interface Result {
}
