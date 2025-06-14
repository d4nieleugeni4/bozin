
const { exec } = require("child_process");
const fs = require("fs");
const path = require("path");

module.exports = {
  command: "baixar",
  description: "Baixa vídeo do YouTube",

  async handler(ctx) {
    const url = ctx.message.text.split(" ")[1];
    if (!url) {
      return ctx.reply("❗ Você precisa enviar a URL do YouTube. Exemplo: /baixar https://youtube.com/...");
    }

    const outputPath = `video_${Date.now()}.mp4`;

    await ctx.reply("⏬ Baixando o vídeo, aguarde...");

    exec(`./yt-dlp -o "${outputPath}" -f mp4 ${url}`, async (err, stdout, stderr) => {
      if (err) {
        console.error("Erro ao baixar vídeo:", stderr);
        return ctx.reply("❌ Erro ao baixar o vídeo.");
      }

      try {
        await ctx.replyWithVideo({ source: fs.createReadStream(outputPath) });
      } catch (err) {
        console.error("Erro ao enviar vídeo:", err);
        ctx.reply("❌ Erro ao enviar o vídeo para o Telegram.");
      } finally {
        fs.unlink(outputPath, () => {});
      }
    });
  },
};
