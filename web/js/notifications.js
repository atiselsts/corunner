/**
 * Copyright 2013 IBM Corp.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 **/
"use strict";
SPACESCANNER.notify = function() {
    var currentNotifications = [];
    var c = 0;
    return function(msg,type,fixed,timeout) {
        if (currentNotifications.length > 4) {
            var ll = currentNotifications.length;
            for (var i = 0;ll > 4 && i<currentNotifications.length;i+=1) {
                var n = currentNotifications[i];
                if (!n.fixed) {
                    window.clearTimeout(n.timeoutid);
                    n.close();
                    ll -= 1;
                }
            }
        }
        var n = document.createElement("div");
        n.id="spacescanner-notification-"+c;
        n.className = "alert";
        n.fixed = fixed;
        if (type) {
            n.className = "alert alert-"+type;
        }
        n.style.display = "none";
        n.style.borderColor = "black";
        n.style.borderWidth = "2px";
        n.style.color = "black";
        n.innerHTML = msg;
        $("#notifications").append(n);
        $(n).slideDown(300);
        n.close = function() {
            var nn = n;
            return function() {
                currentNotifications.splice(currentNotifications.indexOf(nn),1);
                $(nn).slideUp(300, function() {
                    if (nn.parentNode) {
                        nn.parentNode.removeChild(nn);
                    }
                });
            };
        }();
        if (!fixed) {
            n.timeoutid = window.setTimeout(n.close,timeout||5000);
        }
        n.onclick = function() {
            currentNotifications.splice(currentNotifications.indexOf(n),1);
            n.parentNode.removeChild(n);
        };
        currentNotifications.push(n);
        c+=1;
        return n;
    }
}();

