var Ontology = ['Thing', '_Communication', 'Algorithm', 'Amplification', 'Authentication', 'ChangeDetection', 'Compression', 'DecisionMaking', 'Decoding', 'Decryption', 'DeNoising', 'Encoding', 'Encryption', 'Merging', 'Splitting', 'AudioBitrate', 'AudioBitrateType', 'CBR', 'VBR', 'AverageBR', 'OnOffBR', 'AudioBitrateValue', '1100kb/s', '125kb/s', '690kb/s', 'AudioType', 'Monophonic', 'Stereophonic', 'Codec', 'AudioCodec', 'FLAC', 'MP3', 'PCM', 'VideoCodec', 'MPEG-1', 'MPEG-2', 'MPEG-4', '4K', 'HighDefinition', 'StandardDefinition', 'ColorScheme', 'BlackAndWhite', 'RGB', 'Data', 'Message', 'Character', 'Image', 'Number', 'Stream', 'Audio', 'Video', 'EncodingType', 'Lossless', 'Lossy', 'ImageCompression', 'ImageCompressionLossless', 'BMP', 'GIF', 'PNG', 'TIFF', 'ImageCompressionLossy', 'DCT', 'JPEG', 'MessageFormat', 'CSV', 'RTF', 'TXT', 'XLS', 'XML', 'Processing', 'AudioProcessing', 'SoundAnalysis', 'SpeechReccognition', 'DataProcessing', 'Filtering', 'StatisticalProcessing', 'VideoProcessing', 'BackgroundRecognition', 'ColorsChange', 'EdgeProcessing', 'MotionTracking', 'SamplingRate', 'Sensor', 'AnalogSensor', 'HumiditySensor', 'InsolationSensor', 'TemperatureSensor', 'AudioSensor', 'Microphone', 'DigitalSensor', 'ChemicalSensor', 'CO2Sensor', 'MotionSensor', 'NoiseSensor', 'SmokeSensor', 'VideoSensor', 'Camcoder', 'SensorOutput', 'SensorStatus', 'SensorError', 'SensorOK', 'Size', 'VideoBitrate', 'VideoBitrateValue', '1.5Mb/s', '100Mb/s', '15Mb/s', '16Mb/s', '200Mb/s', '40Mb/s', '4Mb/s', '56Mb/s', '60Mb/s', '768kb/s', '90Mb/s', '_Process', 'Alert', 'AlertAction', 'InitiateAlert', 'SendAlert', 'SetAlertStatus', 'SetAlertType', 'AlertData', 'AlertDataActions', 'Aggregate', 'Compress', 'Convert', 'Decompress', 'Process', 'Send', 'SetParameters', 'Store', 'AlertID', 'AlertObject', 'AlertStatus', 'AlertError', 'AlertOK', 'AlertProcessing', 'ClientNotified', 'MonitoringNotified', 'AlertType', 'High', 'Low', 'Timing', 'Hrs18_6', 'Hrs24', 'Hrs6_18', 'Client', 'ClientData', 'Firstname', 'Phone', 'Surname', 'Object', 'ObjectID', 'ObjectLocation', 'Address', 'Area', 'GPS', 'EW', 'NS', 'ObjectOwner', 'ObjectType', 'Building', 'House', 'Laboratory', 'Room', 'Person', 'PersonID', 'Service', 'ServiceLocation', 'IP', 'Port'];

var ServiceClasses = ["Monitoring", "Process", "Send", "Store", "StartVideoCodingAndEncryptionService", "StartVideoDenoisingService", "StartDecryptionService", "StartEncryptionService", "StartTransmissionService", "StartVideoCodingService"];

var Ontology_JSON = {data:'Thing', children: [{data:'_Communication', children: [{data:'Algorithm', children: [{data:'Amplification', children: []}, {data:'Authentication', children: []}, {data:'ChangeDetection', children: []}, {data:'Compression', children: []}, {data:'DecisionMaking', children: []}, {data:'Decoding', children: []}, {data:'Decryption', children: []}, {data:'DeNoising', children: []}, {data:'Encoding', children: []}, {data:'Encryption', children: []}, {data:'Merging', children: []}, {data:'Splitting', children: []}]}, {data:'AudioBitrate', children: []}, {data:'AudioBitrateType', children: [{data:'CBR', children: []}, {data:'VBR', children: [{data:'AverageBR', children: []}, {data:'OnOffBR', children: []}]}]}, {data:'AudioBitrateValue', children: [{data:'1100kb/s', children: []}, {data:'125kb/s', children: []}, {data:'690kb/s', children: []}]}, {data:'AudioType', children: [{data:'Monophonic', children: []}, {data:'Stereophonic', children: []}]}, {data:'Codec', children: [{data:'AudioCodec', children: [{data:'FLAC', children: []}, {data:'MP3', children: []}, {data:'PCM', children: []}]}, {data:'VideoCodec', children: [{data:'MPEG-1', children: []}, {data:'MPEG-2', children: []}, {data:'MPEG-4', children: [{data:'4K', children: []}, {data:'HighDefinition', children: []}, {data:'StandardDefinition', children: []}]}]}]}, {data:'ColorScheme', children: [{data:'BlackAndWhite', children: []}, {data:'RGB', children: []}]}, {data:'Data', children: [{data:'Message', children: [{data:'Character', children: []}, {data:'Image', children: []}, {data:'Number', children: []}]}, {data:'Stream', children: [{data:'Audio', children: []}, {data:'Video', children: []}]}]}, {data:'EncodingType', children: [{data:'Lossless', children: []}, {data:'Lossy', children: []}]}, {data:'ImageCompression', children: [{data:'ImageCompressionLossless', children: [{data:'BMP', children: []}, {data:'GIF', children: []}, {data:'PNG', children: []}, {data:'TIFF', children: []}]}, {data:'ImageCompressionLossy', children: [{data:'DCT', children: []}, {data:'JPEG', children: []}]}]}, {data:'MessageFormat', children: [{data:'CSV', children: []}, {data:'RTF', children: []}, {data:'TXT', children: []}, {data:'XLS', children: []}, {data:'XML', children: []}]}, {data:'Processing', children: [{data:'AudioProcessing', children: [{data:'SoundAnalysis', children: []}, {data:'SpeechReccognition', children: []}]}, {data:'DataProcessing', children: [{data:'Filtering', children: []}, {data:'StatisticalProcessing', children: []}]}, {data:'VideoProcessing', children: [{data:'BackgroundRecognition', children: []}, {data:'ColorsChange', children: []}, {data:'EdgeProcessing', children: []}, {data:'MotionTracking', children: []}]}]}, {data:'SamplingRate', children: []}, {data:'Sensor', children: [{data:'AnalogSensor', children: [{data:'HumiditySensor', children: []}, {data:'InsolationSensor', children: []}, {data:'TemperatureSensor', children: []}]}, {data:'AudioSensor', children: [{data:'Microphone', children: []}]}, {data:'DigitalSensor', children: [{data:'ChemicalSensor', children: []}, {data:'CO2Sensor', children: []}, {data:'MotionSensor', children: []}, {data:'NoiseSensor', children: []}, {data:'SmokeSensor', children: []}]}, {data:'VideoSensor', children: [{data:'Camcoder', children: []}]}]}, {data:'SensorOutput', children: []}, {data:'SensorStatus', children: [{data:'SensorError', children: []}, {data:'SensorOK', children: []}]}, {data:'Size', children: []}, {data:'VideoBitrate', children: []}, {data:'VideoBitrateValue', children: [{data:'1.5Mb/s', children: []}, {data:'100Mb/s', children: []}, {data:'15Mb/s', children: []}, {data:'16Mb/s', children: []}, {data:'200Mb/s', children: []}, {data:'40Mb/s', children: []}, {data:'4Mb/s', children: []}, {data:'56Mb/s', children: []}, {data:'60Mb/s', children: []}, {data:'768kb/s', children: []}, {data:'90Mb/s', children: []}]}]}, {data:'_Process', children: [{data:'Alert', children: [{data:'AlertAction', children: [{data:'InitiateAlert', children: []}, {data:'SendAlert', children: []}, {data:'SetAlertStatus', children: []}, {data:'SetAlertType', children: []}]}, {data:'AlertData', children: [{data:'AlertDataActions', children: [{data:'Aggregate', children: []}, {data:'Compress', children: []}, {data:'Convert', children: []}, {data:'Decompress', children: []}, {data:'Process', children: []}, {data:'Send', children: []}, {data:'SetParameters', children: []}, {data:'Store', children: []}]}, {data:'AlertID', children: []}, {data:'AlertObject', children: []}, {data:'AlertStatus', children: [{data:'AlertError', children: []}, {data:'AlertOK', children: []}, {data:'AlertProcessing', children: []}, {data:'ClientNotified', children: []}, {data:'MonitoringNotified', children: []}]}, {data:'AlertType', children: [{data:'High', children: []}, {data:'Low', children: []}]}, {data:'Timing', children: [{data:'Hrs18_6', children: []}, {data:'Hrs24', children: []}, {data:'Hrs6_18', children: []}]}]}]}, {data:'Client', children: [{data:'ClientData', children: [{data:'Firstname', children: []}, {data:'Phone', children: []}, {data:'Surname', children: []}]}]}, {data:'Object', children: [{data:'ObjectID', children: []}, {data:'ObjectLocation', children: [{data:'Address', children: []}, {data:'Area', children: []}, {data:'GPS', children: [{data:'EW', children: []}, {data:'NS', children: []}]}]}, {data:'ObjectOwner', children: []}, {data:'ObjectType', children: [{data:'Building', children: [{data:'House', children: []}, {data:'Laboratory', children: []}]}, {data:'Room', children: []}]}]}, {data:'Person', children: [{data:'PersonID', children: []}]}, {data:'Service', children: [{data:'ServiceLocation', children: [{data:'IP', children: []}, {data:'Port', children: []}]}]}]}]};