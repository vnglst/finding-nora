import { Howl } from "howler";

export const loadSounds = () => {
  const soundsBaseUrl =
    `${import.meta.env.BASE_URL}sounds/`;

  const sources = [
    { id: "squakk", mp3: soundsBaseUrl + "squakk.mp3" },
    { id: "euh", mp3: soundsBaseUrl + "euh.mp3" },
    { id: "nock", mp3: soundsBaseUrl + "nock.mp3" },
    { id: "hooyeah", mp3: soundsBaseUrl + "hooyeah.mp3" },
    { id: "restart", mp3: soundsBaseUrl + "restart.mp3" }
  ];

  const sounds: { [s: string]: Howl } = {};

  sources.forEach(source => {
    sounds[source.id] = new Howl({
      src: [source.mp3]
    });
  });

  return sounds;
};
