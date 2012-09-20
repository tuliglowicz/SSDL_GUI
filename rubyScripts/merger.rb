require "rubygems"
require "crack"
require "json"
# klasa pliku
class MergePart
	attr_accessor :name, :subfiles
	def initialize(name,subfiles)
		@name = name
		@subfiles = subfiles
	end
	 def to_s
    "Plik: #{@name}--#{@subfiles}"
  end
end
# Wersja tworząca tablicę obiektow typu MergePart składający się z Pliku o zadanej nazwie i tablicy podplików które mają się podczepić pod plik.
def createFileArray(filePart)
	filetab = []
	if filePart["file"].class() == Hash
		 fileName = filePart["file"]["name"]
		 fileSubfiles = []
		 mergeFilePart = MergePart.new(fileName,fileSubfiles)
		 filetab << mergeFilePart
	else
	filePart["file"].each do |fpart|
	  fileName = fpart["name"]	
	if fpart["subfiles"] != nil
		fileSubfiles = createFileArray(fpart["subfiles"])
	else
		fileSubfiles = []
	end
		mergeFilePart = MergePart.new(fileName,fileSubfiles)
		filetab << mergeFilePart
end
end
return filetab
end

def createMergedFile(fileArray, file)
	fileArray.each do |part|
		if part.subfiles.length>0
			createMergedFile(part.subfiles,file)
		end
			file.puts("//Poczatek pliku " + part.name)
				File.open(part.name).each do |line|
			file.puts(line)
		end
		file.puts("//Koniec pliku " + part.name)
	end
end
filesArray = []

inputXML = File.open("merge_config.xml")
myXML  = Crack::XML.parse(inputXML)
myJSON = myXML.to_json
myJSON = JSON.parse(myJSON)
tab = createFileArray(myJSON["configMerge"])
mergedFile = File.new("SSDL_GUI.js","w+")
createMergedFile(tab,mergedFile)


