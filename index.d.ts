declare class JanusStatic {
  constructor(options: JanusStatic.JanusOptions);

  getServer(): string;
  isConnected(): boolean;
  getSessionId(): string;
  /**
   * Janus plugin attach
   * @param options 
   */
  attach(options: JanusStatic.JanusPluginOptions): void;
  destroy(options?: JanusStatic.JanusDestroyedOptions): void;
}

declare module JanusStatic {
  /**
   * Janus init
   * @param options Init options
   */
  export function init(options: JanusInitOptions): void;
  export function attachMediaStream (element: Element, stream: MediaStream): void;
  export function listDevices(callback: (devices: MediaDeviceInfo[]) => void): void;
  export function isWebrtcSupported(): boolean;
  export function isExtensionEnabled(): boolean;
  export function randomString(length: number): string;

  export interface JanusOptions {
    server: string | string[];
    iceServers?: string[];
    ipv6?: boolean;
    withCredentials?: boolean;
    max_poll_events?: number;
    destroyOnUnload?: boolean;
    token?: string;
    apisecret?: string;

    success: () => void;
    error: (err: Error) => void;
    destroyed: () => void;
  }

  export interface JanusInitOptions {
    debug?: boolean;
    callback: Function;
  }

  export interface JanusDestroyedOptions {
    success: () => void;
    error: (err: string) => void;
  }

  export interface JanusPluginOptions {
    plugin: string;
    opaqueId?: string;

    /**
     * Attached succeed
     * @param handle JanusPluginHandle
     */
    success: (handle: JanusPluginHandle) => void;
    /**
     * Trap error
     */
    error: (error: Error) => void;
    consentDialog?: (on?: boolean) => void;
    /**
     * 
     * @param message Event Message
     * @param jsep    Janus SDP
     */
    onmessage?: (message: Message, jsep: any) => void;
    onlocalstream?: (stream: any) => void;
    /**
     * Get remote stream
     * @param stream remote stream
     */
    onremotestream?: (stream: any) => void;
    oncleanup?: () => void;
    detached?: () => void;
    ondataopen?: (data: any) => void;
    ondata?: (data: any) => void;
    webrtcState?: (data: any) => void;
    slowLink?: (data: any) => void;
    mediaState?: (data: any) => void;
  }

  export interface Message {
    id: number;
    private_id: number;
    display: string;
    videoroom: string;
    audiobridge: string;
    publishers?: Publisher[];
    participants?: Participant[];
    leaving?: number;
    unpublished?: string;
  }

  export interface Publisher {
    id: number;
    display: string;
  }

  export interface Participant {
    id: number;
    display: string;
    muted: boolean;
  }

  export interface JanusPluginHandle {
    getId(): string;
    getPlugin(): string;
    /**
     * Get bitrate string
     * @return 'n kbits/sec' | 'Invalid handle' | 'Invalid PeerConnection' | 'Feature unsupported by browser'
     */
    getBitrate(): string;
    send(parameters: any): void;
    createOffer(options: CreateOfferOptions): void;
    createAnswer(options: AnswerOfferOptions): void;
    handleRemoteJsep(callbacks: any): void;
    hangup(sendRequest?: boolean): void;
    detach(): void;

    isAudioMuted(): void;
    muteAudio(): void;
    unmuteAudio(): void;

    isVideoMuted(): void;
    muteVideo(): void;
    unmuteVideo(): void;

    webrtcStuff: any;
  }

  export interface CreateOfferOptions {
    media: {
      audioSend?: boolean;
      audioRecv?: boolean;
      audio?: any;
      videoSend?: boolean;
      videoRecv?: boolean;
      video?: any;
      data?: boolean;
      failIfNoAudio?: boolean;
      failIfNoVideo?: boolean;
      screenshareFrameRate?: number;
    };
    trickle?: boolean;
    stream?: any;
    success: (jsep: string) => void;
    error: (err: Error) => void;
  }

  export interface AnswerOfferOptions extends CreateOfferOptions {
    jsep: string;
  }

  export type MessageType = {
    Attached: 'attached',
    Joined: 'joined',
    Destroyed: 'destroyed',
    Event: 'event',
  };
}

declare module "janus-typescript-client" {
  export = JanusStatic;
}
