export interface CommandAction {
    command: string;
    action: () => void;
}
declare const useVoiceCommands: (commands: CommandAction[], continuous?: boolean) => {
    startRecognition: () => void;
    stopRecognition: () => void;
};
export default useVoiceCommands;
