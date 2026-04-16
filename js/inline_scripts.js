
    // ===== STARS =====
    const canvas = document.getElementById('starsCanvas');
    const ctx = canvas.getContext('2d');
    let stars = [];

    function resizeCanvas() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const starColors = ['#00ff88','#00ccff','#ff0088','#ffdd00','#7b2fff','#ffffff','#ff6b35'];

    function makeStar() {
      return {
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: Math.random() * 1.8 + 0.3,
        color: starColors[Math.floor(Math.random() * starColors.length)],
        alpha: Math.random(),
        speed: (Math.random() * 0.015 + 0.003) * (Math.random() < 0.5 ? 1 : -1),
        twinkleSpeed: Math.random() * 0.03 + 0.005,
        vx: (Math.random() - 0.5) * 0.15,
        vy: (Math.random() - 0.5) * 0.15,
      };
    }

    // 180 stars for dense twinkle effect
    for (let i = 0; i < 180; i++) stars.push(makeStar());

    function drawStar(s) {
      ctx.save();
      ctx.globalAlpha = Math.max(0, Math.min(1, s.alpha));
      ctx.shadowBlur = 10;
      ctx.shadowColor = s.color;
      ctx.fillStyle = s.color;
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
      ctx.fill();
      // Extra glow for bigger stars
      if (s.r > 1.2) {
        ctx.globalAlpha = Math.max(0, s.alpha * 0.3);
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r * 3, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore();
    }

    function animateStars() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      stars.forEach(s => {
        s.alpha += s.speed;
        if (s.alpha > 1 || s.alpha < 0) s.speed *= -1;
        s.x += s.vx; s.y += s.vy;
        if (s.x < 0) s.x = canvas.width;
        if (s.x > canvas.width) s.x = 0;
        if (s.y < 0) s.y = canvas.height;
        if (s.y > canvas.height) s.y = 0;
        drawStar(s);
      });
      requestAnimationFrame(animateStars);
    }
    animateStars();

    // ===== RIPPLE ON ALL BUTTONS =====
    document.querySelectorAll('.btn-deploy,.btn-premium,.btn-manage,.vip-session-btn').forEach(btn => {
      btn.addEventListener('click', function(e) {
        const r = document.createElement('span');
        r.className = 'ripple';
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        r.style.cssText = `width:${size}px;height:${size}px;left:${e.clientX-rect.left-size/2}px;top:${e.clientY-rect.top-size/2}px;`;
        this.appendChild(r);
        setTimeout(() => r.remove(), 800);
      });
    });

    // ===== CONFIG DATA =====
    const adeelConfig = {
      "SESSION_ID": { type:"text", value:"", required:true },
      "MODE": { type:"select", value:"public", options:["public","private","inbox","group"], required:false },
      "PREFIX": { type:"text", value:".", required:false },
      "BOT_NAME": { type:"text", value:"ADEEL-MD", required:false },
      "OWNER_NAME": { type:"text", value:"ADEEL-MD", required:false },
      "OWNER_NUMBER": { type:"text", value:"923035512967", required:false },
      "DEV": { type:"text", value:"923035512967", required:false },
      "AUTO_STATUS_SEEN": { type:"checkbox", value:true },
      "AUTO_STATUS_REACT": { type:"checkbox", value:false },
      "AUTO_STATUS_REPLY": { type:"checkbox", value:false },
      "AUTO_STATUS_MSG": { type:"text", value:"*SEEN YOUR STATUS BY ADEEL-MD 🇵🇰*" },
      "ANTI_DELETE": { type:"checkbox", value:false },
      "ANTI_DEL_PATH": { type:"select", value:"inbox", options:["inbox","same"] },
      "ANTI_LINK": { type:"checkbox", value:true },
      "ANTI_LINK_KICK": { type:"checkbox", value:false },
      "ANTI_BAD": { type:"checkbox", value:false },
      "ANTI_VV": { type:"checkbox", value:true },
      "ANTI_CALL": { type:"checkbox", value:false },
      "WELCOME": { type:"checkbox", value:false },
      "ADMIN_EVENTS": { type:"checkbox", value:false },
      "MENTION_REPLY": { type:"checkbox", value:false },
      "AUTO_VOICE": { type:"checkbox", value:false },
      "AUTO_REACT": { type:"checkbox", value:false },
      "AUTO_TYPING": { type:"checkbox", value:false },
      "AUTO_RECORDING": { type:"checkbox", value:false },
      "AUTO_STICKER": { type:"checkbox", value:false },
      "AUTO_REPLY": { type:"checkbox", value:false },
      "READ_MESSAGE": { type:"checkbox", value:false },
      "READ_CMD": { type:"checkbox", value:false },
      "ALWAYS_ONLINE": { type:"checkbox", value:false },
      "PUBLIC_MODE": { type:"checkbox", value:true },
      "DELETE_LINKS": { type:"checkbox", value:false },
      "CUSTOM_REACT": { type:"checkbox", value:false },
      "CUSTOM_REACT_EMOJIS": { type:"text", value:"💝,💖,💗,❤️,🧡,💛,💚,💙,💜" },
      "STICKER_NAME": { type:"text", value:"ADEEL-MD" },
      "MENU_IMAGE_URL": { type:"text", value:"https://files.catbox.moe/sx07qa.jpg" },
      "ALIVE_IMG": { type:"text", value:"https://files.catbox.moe/x2qij1.jpg" },
      "LIVE_MSG": { type:"text", value:"> I'm alive *ADEEL-MD* 🇵🇰" },
      "DESCRIPTION": { type:"text", value:"*©ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴀᴅᴇᴇʟ-ᴍᴅ*" }
    };

    let currentAppName = '', currentApiKey = '';

    // Toggle config
    document.getElementById('toggleConfig').addEventListener('click', function() {
      const grid = document.getElementById('configGrid');
      const arrow = document.getElementById('configArrow');
      if (grid.style.display === 'none') {
        grid.style.display = 'grid';
        arrow.classList.add('open');
        renderConfigItems();
      } else {
        grid.style.display = 'none';
        arrow.classList.remove('open');
      }
    });

    function renderConfigItems() {
      const grid = document.getElementById('configGrid');
      grid.innerHTML = '';
      for (const [key, item] of Object.entries(adeelConfig)) {
        const div = document.createElement('div');
        div.className = 'config-item';
        const label = document.createElement('span');
        label.className = 'config-label';
        label.textContent = key;

        if (item.type === 'checkbox') {
          const cont = document.createElement('div');
          cont.className = 'checkbox-container';
          const inp = document.createElement('input');
          inp.type = 'checkbox'; inp.id = `config-${key}`; inp.checked = item.value;
          const lbl = document.createElement('span');
          lbl.className = 'checkbox-label';
          lbl.textContent = inp.checked ? 'true' : 'false';
          inp.addEventListener('change', () => { lbl.textContent = inp.checked ? 'true' : 'false'; item.value = inp.checked; });
          cont.appendChild(inp); cont.appendChild(lbl);
          div.appendChild(label); div.appendChild(cont);
        } else if (item.type === 'select') {
          const sel = document.createElement('select');
          sel.id = `config-${key}`; sel.className = 'config-value';
          item.options.forEach(o => {
            const opt = document.createElement('option');
            opt.value = o; opt.textContent = o;
            if (o === item.value) opt.selected = true;
            sel.appendChild(opt);
          });
          sel.addEventListener('change', () => { item.value = sel.value; });
          div.appendChild(label); div.appendChild(sel);
        } else {
          const inp = document.createElement('input');
          inp.type = 'text'; inp.id = `config-${key}`;
          inp.className = 'config-value'; inp.value = item.value;
          inp.style.width = '140px';
          inp.addEventListener('change', () => { item.value = inp.value; });
          div.appendChild(label); div.appendChild(inp);
        }
        grid.appendChild(div);
      }
    }

    // Deploy
    document.getElementById('deployBtn').addEventListener('click', async function() {
      const username = document.getElementById('username').value.trim();
      const session_id = document.getElementById('session').value.trim();
      const appname = document.getElementById('appname').value.trim().toLowerCase();

      if (!username)   { showResult('❌ Please enter your GitHub username', 'error'); return; }
      if (!session_id) { showResult('❌ Please enter your SESSION_ID', 'error'); return; }
      if (!appname)    { showResult('❌ Please enter an app name', 'error'); return; }
      if (!/^[a-z0-9-]+$/.test(appname)) { showResult('❌ App name: lowercase letters, numbers & hyphens only', 'error'); return; }

      try {
        const lRes = await fetch(`/api/deployments/${username}`);
        const lData = await lRes.json();
        if (!lData.allowed) { document.getElementById('contactModal').style.display = 'flex'; return; }
      } catch(e) {}

      showResult('🔍 Verifying repository...', '');
      document.getElementById('deployBtn').disabled = true;

      try {
        const rRes = await fetch(`/api/check-repo/${username}/adeel`);
        const rData = await rRes.json();
        if (!rData.repoExists) {
          document.getElementById('forkModal').style.display = 'flex';
          document.getElementById('deployBtn').disabled = false;
          showResult('', '');
          return;
        }
      } catch(e) {}

      document.getElementById('loading').style.display = 'block';
      showResult('⏳ Deploying your bot, please wait...', '');

      const configData = {};
      for (const [key, item] of Object.entries(adeelConfig)) {
        configData[key] = { value: typeof item.value === 'boolean' ? item.value.toString() : item.value };
      }
      configData['SESSION_ID'] = { value: session_id };

      try {
        const response = await fetch('/deploy', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ username, session_id, appname, bot_type: 'adeel', config: configData })
        });
        const data = await response.json();
        document.getElementById('loading').style.display = 'none';
        document.getElementById('deployBtn').disabled = false;

        if (!response.ok) { showResult(`❌ ${data.error}`, 'error'); return; }

        document.getElementById('successAppName').textContent = data.appName;
        document.getElementById('successModal').style.display = 'flex';
        showResult('', '');
        startBuildTracker(data.appName);
      } catch(error) {
        document.getElementById('loading').style.display = 'none';
        document.getElementById('deployBtn').disabled = false;
        showResult('❌ Deployment failed. Please try again.', 'error');
      }
    });

    // Modals
    document.getElementById('sessionBtn').addEventListener('click', () => { document.getElementById('sessionModal').style.display = 'flex'; });
    document.getElementById('closeSessionModal').addEventListener('click', () => { document.getElementById('sessionModal').style.display = 'none'; });
    document.getElementById('premiumBtn').addEventListener('click', () => { document.getElementById('premiumModal').style.display = 'flex'; });
    document.getElementById('closePremiumModal').addEventListener('click', () => { document.getElementById('premiumModal').style.display = 'none'; });
    document.getElementById('closeContactModal').addEventListener('click', () => { document.getElementById('contactModal').style.display = 'none'; });
    document.getElementById('closeForkModal').addEventListener('click', () => { document.getElementById('forkModal').style.display = 'none'; });
    document.getElementById('closeSuccessModal').addEventListener('click', () => { document.getElementById('successModal').style.display = 'none'; stopBuildTracker(); });
    document.getElementById('closeSuccessBtn').addEventListener('click', () => { document.getElementById('successModal').style.display = 'none'; stopBuildTracker(); });
    document.getElementById('manageBtn').addEventListener('click', () => { document.getElementById('manageModal').style.display = 'flex'; });
    document.getElementById('closeManageModal').addEventListener('click', () => {
      document.getElementById('manageModal').style.display = 'none';
      document.getElementById('botInfo').style.display = 'none';
      document.getElementById('manageAppName').value = '';
    });

    document.getElementById('copyAppNameBtn').addEventListener('click', () => {
      navigator.clipboard.writeText(document.getElementById('successAppName').textContent).then(() => showToast('✅ App name copied!'));
    });

    document.getElementById('verifyForkBtn').addEventListener('click', async () => {
      const username = document.getElementById('username').value.trim();
      if (!username) { showResult('❌ Enter your GitHub username first', 'error'); document.getElementById('forkModal').style.display = 'none'; return; }
      const res = await fetch(`/api/check-repo/${username}/adeel`);
      const data = await res.json();
      if (data.repoExists) {
        document.getElementById('forkModal').style.display = 'none';
        showResult('✅ Repository verified! Now click Deploy.', 'success');
      } else {
        showResult('❌ Repository not found. Please fork first.', 'error');
      }
    });

    document.getElementById('loadBotBtn').addEventListener('click', async () => {
      const appName = document.getElementById('manageAppName').value.trim();
      if (!appName) { showResult('❌ Please enter your app name', 'error'); return; }
      if (!/^[a-z0-9-]+$/.test(appName)) { showResult('❌ Invalid app name format', 'error'); return; }
      document.getElementById('manageLoading').style.display = 'block';
      document.getElementById('botInfo').style.display = 'none';
      try {
        const res = await fetch(`/api/bot/${appName}`);
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || 'Bot not found');
        currentAppName = appName; currentApiKey = data.apiKey;
        displayBotInfo(data);
        document.getElementById('botInfo').style.display = 'block';
      } catch(error) {
        showResult(`❌ ${error.message}`, 'error');
      } finally {
        document.getElementById('manageLoading').style.display = 'none';
      }
    });

    function displayBotInfo(data) {
      const el = document.getElementById('botInfo');
      let html = `<div class="bot-info">
        <h3>BOT INFORMATION</h3>
        <p><strong>App Name:</strong> ${data.app.name}</p>
        <p><strong>Created:</strong> ${new Date(data.app.created_at).toLocaleString()}</p>
        <p><strong>Status:</strong> ${data.app.released_at ? 'Deployed ✅' : 'Building ⚡'}</p>
      </div>
      <div class="config-vars"><h3 style="font-family:'Orbitron',monospace;font-size:12px;color:var(--c2);letter-spacing:2px;margin-bottom:10px;">CONFIGURATION</h3>`;
      for (const [key, value] of Object.entries(data.config)) {
        html += `<div class="config-var-item"><span class="config-var-name">${key}</span><input type="text" class="config-var-value" id="config-${key}" value="${value}"></div>`;
      }
      html += `</div><div class="action-buttons">
        <button class="action-btn update-btn" id="updateConfigBtn">💾 UPDATE CONFIG</button>
        <button class="action-btn restart-btn" id="restartBotBtn">🔄 RESTART BOT</button>
        <button class="action-btn delete-btn" id="deleteBotBtn">🗑️ DELETE BOT</button>
      </div>`;
      el.innerHTML = html;
      document.getElementById('updateConfigBtn').addEventListener('click', updateBotConfig);
      document.getElementById('restartBotBtn').addEventListener('click', restartBot);
      document.getElementById('deleteBotBtn').addEventListener('click', deleteBot);
    }

    async function updateBotConfig() {
      if (!currentAppName || !currentApiKey) { showResult('❌ Bot not loaded', 'error'); return; }
      const configVars = {};
      document.querySelectorAll('.config-var-value').forEach(i => { configVars[i.id.replace('config-', '')] = i.value; });
      try {
        const res = await fetch(`/api/bot/${currentAppName}/config`, { method:'PUT', headers:{'Content-Type':'application/json'}, body:JSON.stringify({ configVars, apiKey: currentApiKey }) });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error);
        showToast('✅ Config updated!');
        setTimeout(() => { document.getElementById('manageModal').style.display='none'; document.getElementById('botInfo').style.display='none'; }, 1500);
      } catch(e) { showResult(`❌ ${e.message}`, 'error'); }
    }

    async function restartBot() {
      if (!currentAppName || !currentApiKey) { showResult('❌ Bot not loaded', 'error'); return; }
      try {
        const res = await fetch(`/api/bot/${currentAppName}/restart`, { method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify({ apiKey: currentApiKey }) });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error);
        showToast('✅ Bot restarted!');
        setTimeout(() => { document.getElementById('manageModal').style.display='none'; document.getElementById('botInfo').style.display='none'; }, 1500);
      } catch(e) { showResult(`❌ ${e.message}`, 'error'); }
    }

    async function deleteBot() {
      if (!currentAppName || !currentApiKey) { showResult('❌ Bot not loaded', 'error'); return; }
      if (!confirm('Are you sure? This cannot be undone.')) return;
      try {
        const res = await fetch(`/api/bot/${currentAppName}`, { method:'DELETE', headers:{'Content-Type':'application/json'}, body:JSON.stringify({ apiKey: currentApiKey }) });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error);
        showToast('✅ Bot deleted!');
        setTimeout(() => { document.getElementById('manageModal').style.display='none'; document.getElementById('botInfo').style.display='none'; }, 1500);
      } catch(e) { showResult(`❌ ${e.message}`, 'error'); }
    }

    // Close modals on outside click
    window.addEventListener('click', function(e) {
      ['sessionModal','premiumModal','contactModal','forkModal','successModal','manageModal'].forEach(id => {
        if (e.target === document.getElementById(id)) {
          document.getElementById(id).style.display = 'none';
          if (id === 'manageModal') document.getElementById('botInfo').style.display = 'none';
        }
      });
    });

    function showResult(msg, type) {
      const el = document.getElementById('result');
      el.innerHTML = msg;
      el.className = `result-message ${type}`;
    }

    // ===== RANDOM NAME =====
    const rAdj = ['adeel','xtech','cyber','nova','prime','ultra','turbo','alpha','elite','ghost','blade','storm','nexus','hyper','mega'];
    const rNoun = ['bot','whiz','pro','hub','node','core','wave','tech','vps','sys','net','lab','md','link','plus'];
    document.getElementById('randomNameBtn').addEventListener('click', function() {
      const adj = rAdj[Math.floor(Math.random()*rAdj.length)];
      const noun = rNoun[Math.floor(Math.random()*rNoun.length)];
      const num = Math.floor(Math.random()*9000)+1000;
      const name = adj + '-' + noun + '-' + num;
      document.getElementById('appname').value = name;
      showToast('🎲 Name: ' + name);
    });

    // ===== BUILD TRACKER =====
    let _bInterval = null, _bLogInt = null, _bStart = null;

    const _logs = [
      [0,  '#00ccff', '> Connecting to Heroku platform...'],
      [3,  '#00ff88', '> Fetching ADEEL-MD source code...'],
      [7,  '#00ff88', '> Installing npm packages...'],
      [12, '#00ff88', '> Setting up environment variables...'],
      [17, '#7b2fff', '> Configuring SESSION_ID...'],
      [22, '#00ff88', '> Loading WhatsApp modules...'],
      [28, '#00ff88', '> Compiling bot files...'],
      [34, '#ffdd00', '> Build process running...'],
      [42, '#00ff88', '> Build complete! Starting dyno...'],
      [50, '#7b2fff', '> Launching ADEEL-MD process...'],
      [58, '#00ff88', '> Connecting to WhatsApp servers...'],
      [66, '#ffdd00', '> Initializing command handlers...'],
      [74, '#00ff88', '> Almost ready... 🇵🇰'],
    ];

    function _addLog(msg, color) {
      const el = document.getElementById('buildLog');
      if (!el) return;
      const d = document.createElement('div');
      d.style.color = color || '#00ff88';
      d.textContent = msg;
      el.appendChild(d);
      el.scrollTop = el.scrollHeight;
    }

    function stopBuildTracker() {
      if (_bInterval) { clearInterval(_bInterval); _bInterval = null; }
      if (_bLogInt) { clearInterval(_bLogInt); _bLogInt = null; }
    }

    function startBuildTracker(appName) {
      stopBuildTracker();
      _bStart = Date.now();
      const logEl = document.getElementById('buildLog');
      if (logEl) logEl.innerHTML = '';
      _addLog('> Deploy started: ' + appName, '#00ccff');
      _addLog('> Platform: Heroku | Bot: ADEEL-MD 🇵🇰', '#7b2fff');

      let shown = 0;
      _bLogInt = setInterval(() => {
        const sec = (Date.now() - _bStart) / 1000;
        const el = document.getElementById('elapsedTime');
        if (el) { const m = Math.floor(sec/60), s = Math.floor(sec%60); el.textContent = m>0 ? m+'m '+s+'s' : Math.floor(sec)+'s'; }
        while (shown < _logs.length && sec >= _logs[shown][0]) {
          _addLog(_logs[shown][2], _logs[shown][1]);
          shown++;
        }
      }, 1000);

      let polls = 0;
      const poll = async () => {
        polls++;
        try {
          const res = await fetch('/api/bot/' + appName + '/build-status');
          const data = await res.json();
          const st = document.getElementById('liveStatusText');
          const ic = document.getElementById('successIcon');
          if (data.status === 'ready') {
            stopBuildTracker();
            if (st) { st.textContent = '🟢 ONLINE! Bot is LIVE'; st.style.color = '#00ff88'; }
            if (ic) ic.textContent = '🎉';
            _addLog('✅ Bot is ONLINE and LIVE! 🇵🇰', '#00ff88');
            _addLog('📱 Open WhatsApp and enjoy ADEEL-MD!', '#ffdd00');
          } else if (data.status === 'failed') {
            stopBuildTracker();
            if (st) { st.textContent = '❌ Build Failed'; st.style.color = '#ff4466'; }
            _addLog('❌ Build failed. Contact admin.', '#ff4466');
          } else if (data.status === 'starting') {
            if (st) { st.textContent = 'Starting... ⚡'; st.style.color = '#ffdd00'; }
            _addLog('⚡ Build done, bot is starting...', '#ffdd00');
          } else {
            if (st && st.textContent.indexOf('🟢') === -1) st.textContent = 'Building... 🔨';
          }
          if (polls >= 50) { stopBuildTracker(); _addLog('⏱ Use Manage Bot to check status.', '#7a9a8a'); }
        } catch { _addLog('⚠ Retrying status check...', '#ff6b35'); }
      };

      setTimeout(() => { poll(); _bInterval = setInterval(poll, 12000); }, 15000);
    }

    function showToast(msg) {
      const t = document.getElementById('toast');
      t.textContent = msg; t.style.display = 'block'; t.style.opacity = '1';
      setTimeout(() => { t.style.opacity = '0'; setTimeout(() => { t.style.display = 'none'; }, 300); }, 2500);
    }
  