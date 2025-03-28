// const axios = require('axios');
// const VMS = [
//     { name: "VM_1", ip: "192.168.1.10" },
//     { name: "VM_2", ip: "192.168.1.11" },
//     { name: "VM_3", ip: "192.168.1.12" }
// ];

// // Sample test queue (could be from ALM, DB, or a file)
// const testQueue = ["TC_001", "TC_002", "TC_003", "TC_004", "TC_005"];

// async function getIdleVM() {
//     for (const vm of VMS) {
//         try {
//             const response = await axios.get(`http://${vm.ip}:3000/status`);
//             if (response.data.status === "idle") {
//                 return vm;
//             }
//         } catch (error) {
//             console.log(`VM ${vm.name} is unreachable.`);
//         }
//     }
//     return null; // No idle VM found
// }

// // Assign tests in parallel to idle VMs
// async function assignTests() {
//     while (testQueue.length > 0) {
//         const idleVM = await getIdleVM();
//         if (!idleVM) {
//             console.log("Waiting for an idle VM...");
//             await new Promise(res => setTimeout(res, 3000)); // Wait 3s before retry
//             continue;
//         }

//         const testId = testQueue.shift();
//         console.log(`Assigning test ${testId} to ${idleVM.name}`);

//         axios.post(`http://${idleVM.ip}:3000/run_test`, { testId })
//             .then(() => console.log(`Test ${testId} started on ${idleVM.name}`))
//             .catch(err => console.error(`Error assigning test ${testId}`, err));
//     }
// }

// // Start distributing tests
// assignTests();
