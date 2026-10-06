import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import { execFile } from 'child_process'
import fs from 'fs'
import path from 'path'
import os from 'os'

function topdooVoicePlugin() {
  return {
    name: 'topdoo-neural-voice-engine',
    configureServer(server) {
      server.middlewares.use('/api/voice/synthesize', async (req, res) => {
        if (req.method !== 'POST') {
          res.statusCode = 405;
          return res.end('Method Not Allowed');
        }

        let body = '';
        req.on('data', chunk => { body += chunk; });
        req.on('end', () => {
          try {
            const data = JSON.parse(body || '{}');
            const text = (data.text || 'Chào mừng bạn đến với Topdoo Studio').trim();
            const profileId = data.profileId || 'kokoro-vi-huyen';
            const userSpeed = Number(data.speed) || 1.0;
            const userPitch = Number(data.pitch) || 1.0;

            const tempDir = os.tmpdir();
            const randId = Date.now() + '_' + Math.random().toString(36).substring(2, 7);
            const aiffPath = path.join(tempDir, `topdoo_${randId}.aiff`);
            const mp3Path = path.join(tempDir, `topdoo_${randId}.mp3`);

            let macVoice = 'Linh';
            let afFilter = '';

            if (profileId === 'kokoro-en-sarah') {
              macVoice = 'Samantha';
              const speedRatio = userSpeed;
              afFilter = `atempo=${Math.max(0.5, Math.min(2.0, speedRatio)).toFixed(3)}`;
            } else if (profileId === 'qwen-narrator') {
              // Hoàng Nam: Nam siêu trầm điện ảnh (Deep Bass)
              macVoice = 'Linh';
              const pitchFactor = 0.65 * userPitch;
              const tempoComp = (1 / pitchFactor) * userSpeed;
              afFilter = `asetrate=22050*${pitchFactor.toFixed(3)},aresample=44100,atempo=${Math.max(0.5, Math.min(2.0, tempoComp)).toFixed(3)},bass=g=6:f=110`;
            } else if (profileId === 'kokoro-vi-minh') {
              // Minh Quân: Nam trung trầm ấm (Baritone)
              macVoice = 'Linh';
              const pitchFactor = 0.78 * userPitch;
              const tempoComp = (1 / pitchFactor) * userSpeed;
              afFilter = `asetrate=22050*${pitchFactor.toFixed(3)},aresample=44100,atempo=${Math.max(0.5, Math.min(2.0, tempoComp)).toFixed(3)},bass=g=3:f=140`;
            } else if (profileId === 'kokoro-vi-huyen') {
              // Huyền Trang: Nữ cao trong trẻo (Soprano)
              macVoice = 'Linh';
              const pitchFactor = 1.15 * userPitch;
              const tempoComp = (1 / pitchFactor) * userSpeed;
              afFilter = `asetrate=22050*${pitchFactor.toFixed(3)},aresample=44100,atempo=${Math.max(0.5, Math.min(2.0, tempoComp)).toFixed(3)},treble=g=3:f=3000`;
            } else if (profileId === 'chatter-podcaster') {
              // Thu Hà: Nữ trung ấm áp podcast (Mezzo-Soprano)
              macVoice = 'Linh';
              const speedRatio = userSpeed;
              afFilter = `atempo=${Math.max(0.5, Math.min(2.0, speedRatio)).toFixed(3)}`;
            } else {
              // Cloned voice
              const isMale = data.gender === 'Nam';
              const pitchFactor = (isMale ? 0.72 : 1.12) * userPitch;
              const tempoComp = (1 / pitchFactor) * userSpeed;
              afFilter = `asetrate=22050*${pitchFactor.toFixed(3)},aresample=44100,atempo=${Math.max(0.5, Math.min(2.0, tempoComp)).toFixed(3)}`;
            }

            // 1. Chạy macOS say command
            execFile('/usr/bin/say', ['-v', macVoice, '-o', aiffPath, text], (sayErr) => {
              if (sayErr) {
                res.statusCode = 500;
                return res.end(JSON.stringify({ error: sayErr.message }));
              }

              // 2. Chạy ffmpeg chuyển đổi và điều chế tần số âm sắc
              const ffmpegArgs = ['-y', '-i', aiffPath];
              if (afFilter) {
                ffmpegArgs.push('-af', afFilter);
              }
              ffmpegArgs.push('-b:a', '128k', mp3Path);

              execFile('/opt/homebrew/bin/ffmpeg', ffmpegArgs, (ffErr) => {
                try { fs.unlinkSync(aiffPath); } catch (_) {}

                if (ffErr) {
                  res.statusCode = 500;
                  return res.end(JSON.stringify({ error: ffErr.message }));
                }

                fs.readFile(mp3Path, (readErr, buffer) => {
                  try { fs.unlinkSync(mp3Path); } catch (_) {}
                  if (readErr) {
                    res.statusCode = 500;
                    return res.end(JSON.stringify({ error: readErr.message }));
                  }

                  res.setHeader('Content-Type', 'audio/mpeg');
                  res.setHeader('Content-Length', buffer.length);
                  res.end(buffer);
                });
              });
            });
          } catch (err) {
            res.statusCode = 500;
            res.end(JSON.stringify({ error: err.message }));
          }
        });
      });
    }
  };
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), topdooVoicePlugin()],
})
