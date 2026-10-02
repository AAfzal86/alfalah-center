async function showPrayerWidget() {
    const container = document.getElementById("prayer-times-widget");
    const currentTimeEl = document.getElementById("prayer-times-widget-current-time");
    const afterSunriseEl = document.getElementById("prayer-times-widget-after-sunrise");
    const afterZawalEl = document.getElementById("prayer-times-widget-after-zawal");
    const beforeSunsetEl = document.getElementById("prayer-times-widget-before-sunrise");

    // false = real logic
    // "active" = force prohibited state
    // "allowed" = force allowed state
    const TEST_MODE = false;

    // Manitoba coordinates from your earlier message
    // const lat = 49.54;
    // const lng = -97.08;
    // const tz = "America/Winnipeg";

    const lat = 53.5250;
    const lng = -113.5236;
    const tz = "America/Edmonton";



    function formatTime(date, withSeconds = false) {
      return date.toLocaleTimeString("en-CA", {
        hour: "numeric",
        minute: "2-digit",
        second: withSeconds ? "2-digit" : undefined,
        hour12: true,
        timeZone: tz
      });
    }

    function getTimezoneNowParts() {
      const now = new Date();
      const parts = new Intl.DateTimeFormat("en-CA", {
        timeZone: tz,
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false
      }).formatToParts(now);

      const obj = {};
      parts.forEach(part => {
        if (part.type !== "literal") obj[part.type] = part.value;
      });

      return {
        year: Number(obj.year),
        month: Number(obj.month),
        day: Number(obj.day),
        hour: Number(obj.hour),
        minute: Number(obj.minute),
        second: Number(obj.second)
      };
    }

    function toMinutes(parts) {
      return parts.hour * 60 + parts.minute + (parts.second / 60);
    }

    function extractHourMinute(date) {
      const parts = new Intl.DateTimeFormat("en-CA", {
        timeZone: tz,
        hour: "2-digit",
        minute: "2-digit",
        hour12: false
      }).formatToParts(date);

      const obj = {};
      parts.forEach(part => {
        if (part.type !== "literal") obj[part.type] = part.value;
      });

      return {
        hour: Number(obj.hour),
        minute: Number(obj.minute)
      };
    }

    function minutesToDisplay(mins) {
      let normalized = mins;

      while (normalized < 0) normalized += 1440;
      while (normalized >= 1440) normalized -= 1440;

      const h = Math.floor(normalized / 60);
      const m = Math.round(normalized % 60);

      const d = new Date();
      d.setHours(h, m, 0, 0);

      return d.toLocaleTimeString("en-CA", {
        hour: "numeric",
        minute: "2-digit",
        hour12: true
      });
    }

    try {
      const res = await fetch(
        `https://api.sunrise-sunset.org/json?lat=${lat}&lng=${lng}&formatted=0`
      );
      const data = await res.json();

      if (data.status !== "OK") {
        container.innerHTML = "Could not load sunrise and sunset times.";
        return;
      }

      const sunrise = new Date(data.results.sunrise);
      const sunset = new Date(data.results.sunset);

      const sr = extractHourMinute(sunrise);
      const ss = extractHourMinute(sunset);

      const sunriseMin = sr.hour * 60 + sr.minute;
      const sunsetMin = ss.hour * 60 + ss.minute;
      const solarNoonMin = (sunriseMin + sunsetMin) / 2;

      function getWindows() {
        const nowParts = getTimezoneNowParts();
        const nowMin = toMinutes(nowParts);

        if (TEST_MODE === "active") {
          return [
            {
              name: "Test Prohibited Time",
              start: nowMin - 1,
              end: nowMin + 19
            }
          ];
        }

        if (TEST_MODE === "allowed") {
          return [
            {
              name: "Test Prohibited Time",
              start: nowMin + 30,
              end: nowMin + 45
            }
          ];
        }

        return [
          {
            name: "After Sunrise",
            start: sunriseMin,
            end: sunriseMin + 15
          },
          {
            name: "Zawal",
            start: solarNoonMin - 10,
            end: solarNoonMin + 10
          },
          {
            name: "Before Sunset",
            start: sunsetMin - 15,
            end: sunsetMin
          }
        ];
      }

      const realWindows = [
        {
          name: "After Sunrise",
          start: sunriseMin,
          end: sunriseMin + 15
        },
        {
          name: "Zawal",
          start: solarNoonMin - 10,
          end: solarNoonMin + 10
        },
        {
          name: "Before Sunset",
          start: sunsetMin - 15,
          end: sunsetMin
        }
      ];

      function render() {
        const nowParts = getTimezoneNowParts();
        const nowMinutes = toMinutes(nowParts);
        const windows = getWindows();

        let activeWindow = null;
        for (const windowItem of windows) {
          if (nowMinutes >= windowItem.start && nowMinutes < windowItem.end) {
            activeWindow = windowItem;
            break;
          }
        }

        let statusHtml = "";

        if (activeWindow) {
          const remaining = Math.ceil(activeWindow.end - nowMinutes);

          statusHtml = `
            <div class="pt-status">
              <div class="pt-circle">
                <div class="pt-circle-inner">
                  <div class="pt-wait">WAIT</div>
                  <div class="pt-minutes-num">${remaining}</div>
                  <div class="pt-minutes-label">MINUTES</div>
                </div>
              </div>
              <div class="pt-subtext">
                Prohibited time is active now<br>
                <strong>${activeWindow.name}</strong>
              </div>
            </div>
          `;
        } 

        container.innerHTML = `
          <div class="pt-body">
            ${statusHtml}
          </div>
        `;

        if (currentTimeEl) {
          currentTimeEl.textContent = formatTime(new Date(), true);
        }

        if (afterSunriseEl) {
          afterSunriseEl.textContent =
            `${minutesToDisplay(realWindows[0].start)} - ${minutesToDisplay(realWindows[0].end)}`;
        }

        if (afterZawalEl) {
          afterZawalEl.textContent =
            `${minutesToDisplay(realWindows[1].start)} - ${minutesToDisplay(realWindows[1].end)}`;
        }

        if (beforeSunsetEl) {
          beforeSunsetEl.textContent =
            `${minutesToDisplay(realWindows[2].start)} - ${minutesToDisplay(realWindows[2].end)}`;
        }
      }

      render();
      setInterval(render, 115000);

    } catch (error) {
      container.innerHTML = "Error loading prayer times.";
      console.error(error);
    }
  }

  showPrayerWidget();
