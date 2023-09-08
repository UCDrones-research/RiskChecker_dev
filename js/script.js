var slider1 = document.getElementById("spinner1");
    var slider2 = document.getElementById("spinner2");
    var slider3 = document.getElementById("spinner3");
    var slider4 = document.getElementById("spinner4");
    var slider5 = document.getElementById("spinner5");
    var slider6 = document.getElementById("spinner6");
    var slider7 = document.getElementById("spinner7");

    slider1.oninput = function () {
      update_Score();
    };

    slider2.oninput = function () {
      update_Score();
    };

    slider3.oninput = function () {
      update_Score();
    };
    slider4.oninput = function () {
      update_Score();
    };

    slider5.oninput = function () {
      update_Score();
    };

    slider6.oninput = function () {
      update_Score();
    };
    slider7.oninput = function () {
      update_Score();
    };

    function update_Score() {
      scores = grab_Scores();
      ind_score_text(scores);
      risk_score = calc_Score(scores);
      update_graph(scores, risk_score);
      perc = risk_score * 100;

      output_expl = "Do not fly";
      if (perc < 45) {
        output_expl = "Minor to Low Risk - Have fun and fly safe.";
      } else if (perc > 81) {
        output_expl = "Cancel flight mission - Do not fly.";
        perc = 100;
      } else if (perc > 63) {
        output_expl =
          "High Risk - Unacceptable without significant risk mitigation.";
      } else {
        output_expl =
          "Moderate Risk - Consider taking extra precautions to reduce risk.";
      }
      num_score = perc / 18;
      if (num_score > 5) {
        output_text = "Risk Score: - (".concat(perc.toFixed(0), "%)");
      } else {
        output_text = "Risk Score: ".concat(
          num_score.toFixed(0),
          " (",
          perc.toFixed(0),
          "%)"
        );
      }
      document.getElementById("risk_text").innerHTML = output_text;
      document.getElementById("risk_expl").innerHTML = output_expl;
    }

    function grab_Scores() {
      sc1 = document.getElementById("spinner1").value;
      sc2 = document.getElementById("spinner2").value;
      sc3 = document.getElementById("spinner3").value;
      sc4 = document.getElementById("spinner4").value;
      sc5 = document.getElementById("spinner5").value;
      sc6 = document.getElementById("spinner6").value;
      sc7 = document.getElementById("spinner7").value;
      return [sc1, sc2, sc3, sc4, sc5, sc6, sc7];
    }

    function ind_score_text(scores) {
      var pilot_text_array = [
        "Exemplary Pilot",
        "Experienced Pilot",
        "Average Pilot",
        "Limited Experience",
        "Inexperienced Pilot"
      ];
      var aircr_text_array = [
        "Commercial Specialty UAS",
        "Commercial Off the Shelf",
        "Commercial - Non-OEM Modifications to Airframe",
        "Experimental",
        "In-Development Testing"
      ];
      var locat_text_array = [
        "Large, empty, access controlled environment",
        "Minimal hazards",
        "Some potential hazards",
        "Sensitive location, publically accessible",
        "Near a crowded public area, limited pedestrian control"
      ];
      var fligh_text_array = [
        "Low altitude, minimal flight travel (<100 ft)",
        "Flight plan with pre-planned routes",
        "Automated (computer generated) flight path",
        "Manual flying at significant altitude or distance",
        "Experimental or Aggressive flight maneuvers"
      ];
      var weath_text_array = [
        "Clear skies and no wind",
        "Light winds, and favorable conditions ",
        "Moderate wind or visibility issues",
        "High wind and/or low visibility",
        "Exceeds manufacturers prefered flight conditions, approaching legal no-go conditions"
      ];
      var gcrew_text_array = [
        "Experienced flight crew, with coordination protocols in place",
        "Experienced Visual Observer and some additional untrained helpers",
        "Experienced or trained Visual Observer",
        "Inexperienced or untrained visual observer",
        "No VO or ground crew"
      ];
      var organ_text_array = [
        "Strict adherance to detailed SOPs, checklists and emergency actions plans",
        "Most SOPs, checklist and emergency action plans in regular use",
        "Checklists for all stages of flight operation",
        "Some checklists or procedures in place",
        "No standards or procedures documented"
      ];
      pilot_text_str = pilot_text_array[scores[0] - 1];
      aircr_text_str = aircr_text_array[scores[1] - 1];
      locat_text_str = locat_text_array[scores[2] - 1];
      fligh_text_str = fligh_text_array[scores[3] - 1];
      weath_text_str = weath_text_array[scores[4] - 1];
      gcrew_text_str = gcrew_text_array[scores[5] - 1];
      organ_text_str = organ_text_array[scores[6] - 1];
      document.getElementById("pilot_text").innerHTML = pilot_text_str;
      document.getElementById("aircr_text").innerHTML = aircr_text_str;
      document.getElementById("locat_text").innerHTML = locat_text_str;
      document.getElementById("fligh_text").innerHTML = fligh_text_str;
      document.getElementById("weath_text").innerHTML = weath_text_str;
      document.getElementById("gcrew_text").innerHTML = gcrew_text_str;
      document.getElementById("organ_text").innerHTML = organ_text_str;
    }

    var calc_Score = function (scores) {
      var data1 = scores.slice(0);
      data1 = [];
      for (i = 0; i < scores.length; i++) {
        if (scores[i] == 5) {
          data1[i] = 8;
        } else if (scores[i] == 4) {
          data1[i] = 6;
        } else {
          data1[i] = scores[i];
        }
      }
      temp = 0;
      for (i = 1; i < 7; i++) {
        temp = temp + 0.5 * 0.7818 * data1[i] * data1[i - 1];
      }
      temp = temp + 0.5 * 0.7818 * data1[0] * data1[6];
      return temp / 47.78;
    };

    var randomScalingFactor = function () {
      return Math.round(Math.random() * 100);
    };

    var color = Chart.helpers.color;
    var config = {
      type: "radar",
      data: {
        labels: [
          "Pilot",
          "Aircraft",
          "Location",
          "Flight Plan",
          "Weather",
          "Ground Crew",
          "Organization"
        ],
        datasets: [
          {
            backgroundColor: "rgba(153,191,0,.4)",
            borderColor: "rgba(153,191,0,1)",
            pointBackgroundColor: "rgba(153,191,0,1)",
            data: [2, 1, 2, 3, 2, 3, 2]
          }
        ]
      },
      options: {
        legend: {
          display: false
        },
        title: {
          display: true,
          text: "Risk Map",
          fontSize: 18,
          fontColor: "#000"
        },
        scale: {
          ticks: {
            min: 0,
            max: 5,
            stepSize: 1
          }
        },
        maintainAspectRatio: false
      }
    };

    window.onload = function () {
      window.myRadar = new Chart(document.getElementById("canvas"), config);
      perc = 26;
      num_score = perc / 18;
      output_text = "Risk Score: ".concat(
        num_score.toFixed(0),
        " (",
        perc.toFixed(0),
        "%)"
      );
      document.getElementById("risk_text").innerHTML = output_text;
      document.getElementById("risk_expl").innerHTML =
        "Moderate Risk - Consider taking extra precautions to reduce risk.";
      var scores = [2, 1, 2, 3, 2, 3, 2];
      ind_score_text(scores);
    };

    function update_graph(scores, risk_score) {
      hue = -130 * risk_score + 120;
      R = 0;
      G = 0;
      C = 0.75;
      if (hue > 120) {
        hue = 120;
      }
      if (hue < 0) {
        hue = 0;
      }
      X = C * (1 - Math.abs(((hue / 60) % 2) - 1));
      if (hue < 60) {
        R = C * 255;
        G = X * 255;
      } else {
        R = X * 255;
        G = C * 255;
      }

      color_string = "rgba(";
      color_string_alpha = color_string.concat(
        R.toFixed(0),
        ",",
        G.toFixed(0),
        ",0,0.3)"
      );
      color_string = color_string.concat(
        R.toFixed(0),
        ",",
        G.toFixed(0),
        ",0,0.8)"
      );
      //console.log(color_string);

      config.data.datasets.forEach(function (dataset) {
        dataset.data = scores;
        dataset.backgroundColor = color_string_alpha;
        dataset.borderColor = color_string;
        dataset.pointBackgroundColor = color_string;
      });
      window.myRadar.update();
    }